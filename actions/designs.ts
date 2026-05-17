'use server';

import { supabase } from '@/lib/supabase';
import { designSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createDesign(formData: unknown) {
  const parsed = designSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'Invalid form data', issues: parsed.error.issues };
  }

  const { data, error } = await supabase
    .from('designs')
    .insert(parsed.data)
    .select()
    .single();

  if (error) return { error: 'Failed to create design.' };
  revalidatePath('/admin/designs');
  revalidatePath('/designs');
  return { success: true, design: data };
}

export async function updateDesign(id: string, formData: unknown) {
  const parsed = designSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'Invalid form data', issues: parsed.error.issues };
  }

  const { data, error } = await supabase
    .from('designs')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: 'Failed to update design.' };
  revalidatePath('/admin/designs');
  revalidatePath(`/designs/${data.slug}`);
  return { success: true, design: data };
}

export async function toggleDesignActive(id: string, active: boolean) {
  const { error } = await supabase
    .from('designs')
    .update({ active })
    .eq('id', id);

  if (error) return { error: 'Failed to toggle design.' };
  revalidatePath('/admin/designs');
  revalidatePath('/designs');
  return { success: true };
}
