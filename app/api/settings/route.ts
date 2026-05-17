import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabase
    .from('site_settings')
    .select('store_name, instagram_url, whatsapp_number')
    .single();
  return NextResponse.json(data ?? { store_name: 'QK Case', instagram_url: '', whatsapp_number: '' });
}
