'use server';

import { supabase } from '@/lib/supabase';
import { categorySchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: unknown) {
  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'Invalid form data', issues: parsed.error.issues };
  }

  const { data, error } = await supabase
    .from('categories')
    .insert(parsed.data)
    .select()
    .single();

  if (error) return { error: 'Failed to create category.' };
  revalidatePath('/admin/categories');
  return { success: true, category: data };
}

export async function updateCategory(id: string, formData: unknown) {
  const parsed = categorySchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'Invalid form data', issues: parsed.error.issues };
  }

  const { data, error } = await supabase
    .from('categories')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: 'Failed to update category.' };
  revalidatePath('/admin/categories');
  return { success: true, category: data };
}

export async function toggleCategoryActive(id: string, active: boolean) {
  const { error } = await supabase
    .from('categories')
    .update({ active })
    .eq('id', id);

  if (error) return { error: 'Failed to toggle category.' };
  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { success: true };
}
