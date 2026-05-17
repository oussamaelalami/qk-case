import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [{ data: orders }, { data: designs }] = await Promise.all([
    supabase
      .from('orders')
      .select('createdAt, designId')
      .gte('createdAt', sixMonthsAgo.toISOString()),
    supabase
      .from('designs')
      .select('id, name, images')
      .eq('active', true),
  ]);

  const today = new Date();

  // Daily: last 7 days
  const dayLabels = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
  const daily = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    return {
      label: dayLabels[d.getDay()],
      count: orders?.filter(o => o.createdAt?.startsWith(dateStr)).length ?? 0,
    };
  });

  // Monthly: last 6 months
  const monthLabels = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
  const monthly = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
    const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return {
      label: monthLabels[d.getMonth()],
      count: orders?.filter(o => o.createdAt?.startsWith(monthStr)).length ?? 0,
    };
  });

  // Popular collections: count orders per designId
  const designCounts: Record<string, number> = {};
  orders?.forEach(o => {
    if (o.designId) designCounts[o.designId] = (designCounts[o.designId] || 0) + 1;
  });

  const popular = Object.entries(designCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const design = designs?.find(d => d.id === id);
      return { id, name: design?.name ?? '', image: design?.images?.[0] ?? '', count };
    })
    .filter(d => d.name);

  return NextResponse.json({ daily, monthly, popular });
}
