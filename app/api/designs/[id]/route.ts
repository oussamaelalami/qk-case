import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from('designs')
      .select('*, categories(name, slug)')
      .eq('active', true)
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { categories, ...design } = data;
    return NextResponse.json({ ...design, category: categories });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch design' }, { status: 500 });
  }
}
