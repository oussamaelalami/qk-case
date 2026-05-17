'use server';

import { supabase } from '@/lib/supabase';
import { orderSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: unknown) {
  const parsed = orderSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: 'Invalid form data', issues: parsed.error.issues };
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customerName: parsed.data.customerName,
      phoneNumber: parsed.data.phoneNumber,
      address: parsed.data.address || null,
      ville: parsed.data.ville || null,
      phoneBrand: parsed.data.phoneBrand,
      phoneModel: parsed.data.phoneModel,
      designId: parsed.data.designId || null,
      customImage: parsed.data.customImage || null,
      previewImage: parsed.data.previewImage || null,
      notes: parsed.data.notes || null,
    })
    .select('id')
    .single();

  if (error) return { error: 'Failed to create order. Please try again.' };
  return { success: true, orderId: data.id };
}

export async function updateOrderStatus(id: string, status: string) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);

  if (error) return { error: 'Failed to update order status.' };
  revalidatePath('/admin/orders');
  return { success: true };
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return { error: 'Failed to delete order.' };
  revalidatePath('/admin/orders');
  return { success: true };
}
