import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const BUCKET = 'uploads';

export async function uploadImage(
  fileBuffer: Buffer,
  folder: string,
  publicId?: string,
): Promise<{ url: string; publicId: string }> {
  const ext = 'jpg';
  const fileName = publicId ?? `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);
  return { url: data.publicUrl, publicId: fileName };
}

export function getOptimizedUrl(url: string, width?: number): string {
  if (!url.includes('supabase.co/storage')) return url;
  if (!width) return url;
  return `${url}?width=${width}&quality=80`;
}
