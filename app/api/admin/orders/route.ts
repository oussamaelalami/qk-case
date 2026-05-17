import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '20');
  const from = (page - 1) * limit;

  let query = supabase
    .from('orders')
    .select('*, designs(name)', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(from, from + limit - 1);

  if (status) query = query.eq('status', status);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const orders = data?.map(({ designs, ...o }) => ({ ...o, design: designs }));
  const total = count ?? 0;
  return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
}
