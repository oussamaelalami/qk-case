import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { categorySchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  void req;
  const { data, error } = await supabase
    .from('categories')
    .select('*, designs(id)')
    .order('sortOrder', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const result = data?.map(({ designs, ...cat }) => ({
    ...cat,
    _count: { designs: (designs as { id: string }[]).length },
  }));

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', issues: parsed.error.issues }, { status: 400 });
  }

  const { data, error } = await supabase.from('categories').insert(parsed.data).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
