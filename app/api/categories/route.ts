import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, designs(id, active)')
      .eq('active', true)
      .order('sortOrder', { ascending: true });

    if (error) throw error;

    const result = data?.map(({ designs, ...cat }) => ({
      ...cat,
      _count: { designs: (designs as { active: boolean }[]).filter(d => d.active).length },
    }));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
