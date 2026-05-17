import { supabase } from '@/lib/supabase';
import { HomeContent } from '@/components/HomeContent';

export const dynamic = 'force-dynamic';

interface FeaturedDesign {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string; slug: string } | null;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

async function getTopDesigns(): Promise<FeaturedDesign[]> {
  try {
    const { data } = await supabase
      .from('designs')
      .select('id, name, slug, price, images, categories(name, slug), orders(id)')
      .eq('active', true);

    if (!data) return [];

    return (data as unknown as Array<{
      id: string; name: string; slug: string; price: number; images: string[];
      categories: { name: string; slug: string } | null;
      orders: { id: string }[];
    }>)
      .sort((a, b) => b.orders.length - a.orders.length)
      .slice(0, 4)
      .map(({ categories, orders: _o, ...d }) => ({ ...d, category: categories }));
  } catch {
    return [];
  }
}

async function getCategories(): Promise<CategoryItem[]> {
  try {
    const { data } = await supabase
      .from('categories')
      .select('id, name, slug, image')
      .eq('active', true)
      .order('sortOrder', { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredDesigns, categories] = await Promise.all([getTopDesigns(), getCategories()]);
  return <HomeContent featuredDesigns={featuredDesigns} categories={categories} />;
}
