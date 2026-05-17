'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder } from '@/actions/orders';
import { useI18n } from '@/lib/i18n';

interface Design {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description?: string;
  category: { name: string; slug: string };
}

export default function DesignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { t } = useI18n();
  const [design,      setDesign]      = useState<Design | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [ordering,    setOrdering]    = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    phoneNumber:  '',
    address:      '',
    ville:        '',
    phoneBrand:   '',
    phoneModel:   '',
    notes:        '',
  });

  useEffect(() => {
    fetch(`/api/designs/${slug}`).then(r => r.json()).then(setDesign);
  }, [slug]);

  if (!design) {
    return (
      <div className="max-w-[1280px] mx-auto px-gutter py-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <div className="aspect-square rounded-2xl skeleton-dark" />
          <div className="space-y-md pt-md">
            <div className="h-5 skeleton-dark rounded w-1/4" />
            <div className="h-10 skeleton-dark rounded w-3/4" />
            <div className="h-5 skeleton-dark rounded w-1/2" />
            <div className="h-24 skeleton-dark rounded mt-lg" />
            <div className="h-12 skeleton-dark rounded mt-sm" />
          </div>
        </div>
      </div>
    );
  }

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.phoneNumber || !form.phoneBrand || !form.phoneModel) {
      toast.error(t.order.required_fields);
      return;
    }
    setOrdering(true);
    try {
      const result = await createOrder({
        customerName: form.customerName,
        phoneNumber:  form.phoneNumber,
        address:      form.address,
        ville:        form.ville,
        phoneBrand:   form.phoneBrand,
        phoneModel:   form.phoneModel,
        designId:     design.id,
        notes:        form.notes,
      });
      if ('error' in result) {
        toast.error(result.error);
      } else {
        const image = encodeURIComponent(design.images[0] ?? '');
        const name  = encodeURIComponent(design.name);
        router.push(`/success?orderId=${result.orderId}&image=${image}&name=${name}`);
      }
    } finally {
      setOrdering(false);
    }
  };

  const inp =
    'w-full px-sm py-xs rounded-xl border border-white/8 bg-surface-container text-on-surface text-body-md focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all duration-200 placeholder:text-on-surface-variant';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-gutter pt-md">
        <div className="flex items-center gap-xs text-on-surface-variant text-sm">
          <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
          <span className="material-symbols-outlined text-sm opacity-40">chevron_right</span>
          <Link href="/browse" className="hover:text-primary transition-colors">{t.nav.browse}</Link>
          <span className="material-symbols-outlined text-sm opacity-40">chevron_right</span>
          <span className="text-on-surface font-medium">{design.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-gutter py-xl grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low border border-white/5 mb-md relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={design.images[activeImage]}
                alt={design.name}
                className="w-full h-full object-contain p-xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {design.images.length > 1 && (
            <div className="flex gap-sm">
              {design.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    i === activeImage
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.1em]">
            {design.category.name}
          </div>
          <h1 className="font-h1 text-h1 text-on-surface mb-sm">{design.name}</h1>
          {design.description && (
            <p className="text-on-surface-variant text-body-md mb-lg leading-relaxed">
              {design.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-lg p-md bg-surface-container-low rounded-2xl border border-white/5">
            <div className="text-on-surface-variant text-sm">{t.order.price_label}</div>
            <div className="text-[40px] font-extrabold text-on-surface leading-none">
              {design.price} <span className="text-primary">MAD</span>
            </div>
          </div>

          <form onSubmit={handleOrder} className="space-y-sm">
            <div className="text-label-caps font-label-caps text-on-surface-variant tracking-[0.1em] mb-xs">
              {t.order.your_info}
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div>
                <label className="text-xs text-on-surface-variant mb-xs block">{t.order.full_name} *</label>
                <input
                  required
                  placeholder={t.order.full_name_placeholder}
                  value={form.customerName}
                  onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                  className={inp}
                />
              </div>
              <div>
                <label className="text-xs text-on-surface-variant mb-xs block">{t.order.phone_number} *</label>
                <input
                  required
                  placeholder={t.order.phone_number_placeholder}
                  value={form.phoneNumber}
                  onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-on-surface-variant mb-xs block">{t.order.address}</label>
              <input
                placeholder={t.order.address_placeholder}
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs text-on-surface-variant mb-xs block">{t.order.ville}</label>
              <input
                placeholder={t.order.ville_placeholder}
                value={form.ville}
                onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
                className={inp}
              />
            </div>

            <div className="text-label-caps font-label-caps text-on-surface-variant tracking-[0.1em] pt-xs mb-xs">
              {t.order.your_phone}
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div>
                <label className="text-xs text-on-surface-variant mb-xs block">{t.order.phone_brand} *</label>
                <input
                  required
                  placeholder={t.order.phone_brand_placeholder}
                  value={form.phoneBrand}
                  onChange={e => setForm(f => ({ ...f, phoneBrand: e.target.value }))}
                  className={inp}
                />
              </div>
              <div>
                <label className="text-xs text-on-surface-variant mb-xs block">{t.order.phone_model} *</label>
                <input
                  required
                  placeholder={t.order.phone_model_placeholder}
                  value={form.phoneModel}
                  onChange={e => setForm(f => ({ ...f, phoneModel: e.target.value }))}
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-on-surface-variant mb-xs block">{t.order.notes}</label>
              <textarea
                placeholder={t.order.notes_placeholder}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={2}
                className={inp + ' resize-none'}
              />
            </div>

            <button
              type="submit"
              disabled={ordering}
              className="w-full py-md bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/35 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed mt-sm"
            >
              {ordering ? (
                <span className="flex items-center justify-center gap-sm">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.order.submitting}
                </span>
              ) : (
                t.order.submit
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
