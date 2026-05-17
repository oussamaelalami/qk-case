'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { createOrder } from '@/actions/orders';
import { CaseMockup } from '@/components/CaseMockup';
import { PHONE_DB } from '@/lib/phone-db';
import { useI18n } from '@/lib/i18n';

const BRANDS = Object.keys(PHONE_DB);

function CustomizerContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { t }        = useI18n();
  const designId     = searchParams.get('designId');
  const fileRef      = useRef<HTMLInputElement>(null);

  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [selectedModel, setSelectedModel] = useState(
    Object.keys(PHONE_DB[BRANDS[0]].models)[0],
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading,     setUploading]     = useState(false);
  const [ordering,      setOrdering]      = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [form, setForm] = useState({ customerName: '', phoneNumber: '', address: '', ville: '', notes: '' });
  const [mockupSize, setMockupSize] = useState({ maxH: 480, maxW: 240 });

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 1024;
      setMockupSize(
        isMobile
          ? { maxH: Math.min(window.innerHeight * 0.30, 240), maxW: 150 }
          : { maxH: Math.min(window.innerHeight * 0.62, 520), maxW: 240 },
      );
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const brandData      = PHONE_DB[selectedBrand];
  const modelsForBrand = Object.entries(brandData.models);
  const modelLabel     = brandData.models[selectedModel]?.label ?? '';

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(Object.keys(PHONE_DB[brand].models)[0]);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res  = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUploadedImage(data.url);
      toast.success('Design uploaded!');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.phoneNumber) {
      toast.error(t.customizer.required_error);
      return;
    }
    setOrdering(true);
    try {
      const result = await createOrder({
        customerName: form.customerName,
        phoneNumber:  form.phoneNumber,
        address:      form.address,
        ville:        form.ville,
        phoneBrand:   brandData.label,
        phoneModel:   modelLabel,
        designId:     designId ?? undefined,
        customImage:  uploadedImage ?? undefined,
        notes:        form.notes,
      });
      if ('error' in result) toast.error(result.error);
      else {
        const params = new URLSearchParams({ orderId: result.orderId });
        if (uploadedImage) params.set('image', encodeURIComponent(uploadedImage));
        router.push(`/success?${params}`);
      }
    } finally { setOrdering(false); }
  };

  const inp = 'w-full px-3 py-2 rounded-xl border border-white/8 bg-surface-container text-on-surface text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-on-surface-variant';

  return (
    /* Mobile: column stack. Desktop: side-by-side */
    <div className="bg-background text-on-background flex flex-col lg:flex-row lg:h-[calc(100vh-72px)] lg:overflow-hidden">

      {/* ── Mockup panel ─────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center gap-3 px-6 pt-6 pb-4 lg:flex-1 lg:p-6 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(124,127,250,0.06)_0%,transparent_70%)]" />

        <p className="text-xs font-semibold tracking-widest text-on-surface-variant uppercase">
          {brandData.label} — {modelLabel}
        </p>

        <CaseMockup
          brand={selectedBrand}
          model={selectedModel}
          designURL={uploadedImage}
          onUploadClick={() => fileRef.current?.click()}
          uploading={uploading}
          maxHeight={mockupSize.maxH}
          maxWidth={mockupSize.maxW}
        />

        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-4 py-2 bg-surface-container-low border border-white/8 text-on-surface rounded-full font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-xs"
        >
          <span className="material-symbols-outlined text-[15px]">
            {uploadedImage ? 'swap_horiz' : 'add_photo_alternate'}
          </span>
          {uploadedImage ? t.customizer.change : t.customizer.upload}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ''; }}
        />
      </section>

      {/* ── Controls panel ───────────────────────────────────── */}
      <aside className="
        w-full border-t border-white/5
        lg:w-[280px] lg:flex-shrink-0 lg:border-t-0 lg:border-l
        bg-surface-container-low/60 backdrop-blur-xl
        overflow-y-auto flex flex-col gap-4 p-4
      ">

        {/* Brand selection */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase mb-2">
            {t.customizer.brand}
          </p>
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-1.5">
            {BRANDS.map(brand => (
              <button
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 text-[10px] font-semibold transition-all capitalize ${
                  selectedBrand === brand
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/5 text-on-surface-variant hover:border-primary/30 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">smartphone</span>
                {PHONE_DB[brand].label}
              </button>
            ))}
          </div>
        </div>

        {/* Model selection */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase mb-2">
            {t.customizer.model}
          </p>
          {/* Mobile: horizontal scroll chips. Desktop: vertical list */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:hidden">
            {modelsForBrand.map(([modelId, modelData]) => (
              <button
                key={modelId}
                onClick={() => setSelectedModel(modelId)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  selectedModel === modelId
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/8 text-on-surface-variant hover:border-primary/30'
                }`}
              >
                {modelData.label}
              </button>
            ))}
          </div>
          {/* Desktop: vertical scrollable list */}
          <div className="hidden lg:block space-y-1 max-h-[260px] overflow-y-auto pr-1">
            {modelsForBrand.map(([modelId, modelData]) => (
              <button
                key={modelId}
                onClick={() => setSelectedModel(modelId)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-xl border text-left text-sm transition-all ${
                  selectedModel === modelId
                    ? 'border-primary text-primary font-bold bg-primary/5'
                    : 'border-white/5 text-on-surface hover:border-primary/30'
                }`}
              >
                <span>{modelData.label}</span>
                {selectedModel === modelId && (
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer (desktop only) */}
        <div className="hidden lg:flex flex-1" />

        {/* Order section */}
        <div className="pb-4 lg:pb-0">
          {showOrderForm ? (
            <form onSubmit={handleOrder} className="space-y-2">
              <input placeholder={`${t.customizer.full_name} *`} required
                value={form.customerName}
                onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                className={inp} />
              <input placeholder={`${t.customizer.phone_number} *`} required
                value={form.phoneNumber}
                onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                className={inp} />
              <input placeholder={t.customizer.address}
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                className={inp} />
              <input placeholder={t.customizer.ville}
                value={form.ville}
                onChange={e => setForm(f => ({ ...f, ville: e.target.value }))}
                className={inp} />
              <textarea placeholder={t.customizer.notes}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className={inp + ' resize-none'} rows={2} />
              <button type="submit" disabled={ordering}
                className="w-full py-3 bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 text-sm">
                {ordering ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.customizer.sending}
                  </span>
                ) : t.customizer.confirm}
              </button>
              <button type="button" onClick={() => setShowOrderForm(false)}
                className="w-full py-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                {t.customizer.cancel}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowOrderForm(true)}
              className="w-full py-3 bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm"
            >
              {t.customizer.order_btn}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export default function CustomizerPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center text-on-surface-variant">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <CustomizerContent />
    </Suspense>
  );
}
