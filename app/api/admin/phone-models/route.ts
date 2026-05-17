import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('phone_models')
    .select('*')
    .order('brand')
    .order('sortOrder');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { brand, model, caseImage, printAreaTop, printAreaLeft, printAreaWidth, printAreaHeight, sortOrder } = body;

  if (!brand || !model || !caseImage) {
    return NextResponse.json({ error: 'brand, model and caseImage are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('phone_models')
    .insert({ brand, model, caseImage, printAreaTop, printAreaLeft, printAreaWidth, printAreaHeight, sortOrder })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
