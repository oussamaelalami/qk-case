import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '12');
    const from = (page - 1) * limit;

    let query = supabase
      .from('designs')
      .select('*, categories(name, slug)', { count: 'exact' })
      .eq('active', true)
      .order('createdAt', { ascending: false })
      .range(from, from + limit - 1);

    if (featured === 'true') query = query.eq('featured', true);

    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      if (cat) query = query.eq('categoryId', cat.id);
    }

    const { data, count, error } = await query;
    if (error) throw error;

    const designs = data?.map(({ categories, ...d }) => ({ ...d, category: categories }));
    const total = count ?? 0;
    return NextResponse.json({ designs, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch designs' }, { status: 500 });
  }
}
