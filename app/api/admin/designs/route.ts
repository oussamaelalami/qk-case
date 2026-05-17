import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { designSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');
  const from = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from('designs')
    .select('*, categories(name, slug)', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const designs = data?.map(({ categories, ...d }) => ({ ...d, category: categories }));
  const total = count ?? 0;
  return NextResponse.json({ designs, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = designSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', issues: parsed.error.issues }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('designs')
    .insert(parsed.data)
    .select('*, categories(name, slug)')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { categories, ...design } = data;
  return NextResponse.json({ ...design, category: categories }, { status: 201 });
}
