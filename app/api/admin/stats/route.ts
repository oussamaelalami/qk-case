import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { data: recentOrdersRaw },
    { data: topDesignsRaw },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
    supabase.from('orders').select('*, designs(name, price)').order('createdAt', { ascending: false }).limit(5),
    supabase.from('designs').select('*, orders(id)').eq('active', true),
  ]);

  const recentOrders = recentOrdersRaw?.map(({ designs, ...o }) => ({ ...o, design: designs }));

  const topDesigns = topDesignsRaw
    ?.map(({ orders, ...d }) => ({ ...d, _count: { orders: (orders as { id: string }[]).length } }))
    .sort((a, b) => b._count.orders - a._count.orders)
    .slice(0, 5);

  return NextResponse.json({ totalOrders: totalOrders ?? 0, pendingOrders: pendingOrders ?? 0, recentOrders, topDesigns });
}
