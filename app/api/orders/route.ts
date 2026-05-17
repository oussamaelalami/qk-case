import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { orderSchema } from '@/lib/validations';
import { orderRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const rl = orderRateLimit(ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
      );
    }

    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', issues: parsed.error.issues }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customerName: parsed.data.customerName,
        phoneNumber: parsed.data.phoneNumber,
        phoneBrand: parsed.data.phoneBrand,
        phoneModel: parsed.data.phoneModel,
        designId: parsed.data.designId || null,
        customImage: parsed.data.customImage || null,
        previewImage: parsed.data.previewImage || null,
        notes: parsed.data.notes || null,
      })
      .select('*, designs(name, price)')
      .single();

    if (error) throw error;

    const { designs, ...order } = data;
    return NextResponse.json({ order: { ...order, design: designs } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
