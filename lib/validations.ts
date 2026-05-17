import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phoneNumber: z.string().min(6, 'Invalid phone number').max(20),
  address: z.string().max(200).optional().or(z.literal('')),
  ville: z.string().max(100).optional().or(z.literal('')),
  phoneBrand: z.string().min(1, 'Phone brand is required').max(50),
  phoneModel: z.string().min(1, 'Phone model is required').max(100),
  designId: z.string().optional(),
  customImage: z.string().url().optional().or(z.literal('')),
  previewImage: z.string().url().optional().or(z.literal('')),
  notes: z.string().max(500).optional().or(z.literal('')),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const designSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().max(500).optional().or(z.literal('')),
  price: z.number().positive().max(9999),
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  categoryId: z.string(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export type DesignInput = z.infer<typeof designSchema>;

export const categorySchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  image: z.string().url().optional().or(z.literal('')),
  sortOrder: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const orderStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PRINTED', 'DELIVERED', 'CANCELLED']),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
