'use client';

import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

interface PhoneModel {
  id: string;
  brand: string;
  model: string;
  caseImage: string;
  active: boolean;
  sortOrder: number;
}

const defaultForm = {
  brand: '',
  model: '',
  caseImage: '',
  sortOrder: 0,
};

export default function PhoneModelsPage() {
  const [models, setModels] = useState<PhoneModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PhoneModel | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch('/api/admin/phone-models');
    const data = await res.json();
    setModels(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm(f => ({ ...f, caseImage: data.url }));
      toast.success('Image uploaded!');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const openAdd = () => { setEditing(null); setForm(defaultForm); setShowForm(true); };
  const openEdit = (m: PhoneModel) => {
    setEditing(m);
    setForm({ brand: m.brand, model: m.model, caseImage: m.caseImage, sortOrder: m.sortOrder });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.caseImage) { toast.error('Please upload a case image'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/phone-models/${editing.id}` : '/api/admin/phone-models';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success(editing ? 'Updated!' : 'Added!');
      setShowForm(false);
      load();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this phone model?')) return;
    await fetch(`/api/admin/phone-models/${id}`, { method: 'DELETE' });
    toast.success('Removed');
    load();
  };

  const brands = [...new Set(models.map(m => m.brand))];

  return (
    <div className="p-4 lg:p-lg">
      <div className="flex items-center justify-between mb-6 lg:mb-lg gap-3">
        <div className="min-w-0">
          <h1 className="text-h1 font-extrabold text-on-surface">Phone Models</h1>
          <p className="text-on-surface-variant text-body-md hidden sm:block">Manage phone brands, models and their case photos</p>
        </div>
        <button onClick={openAdd} className="flex-shrink-0 flex items-center gap-sm px-3 py-2 lg:px-md lg:py-sm bg-primary text-on-primary rounded-2xl font-bold hover:opacity-90 transition-opacity text-sm">
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="hidden sm:inline">Add Model</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {loading ? (
        <div className="text-on-surface-variant">Loading...</div>
      ) : models.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] mb-md block">smartphone</span>
          <p className="text-h2 font-bold mb-xs">No phone models yet</p>
          <p className="mb-lg">Add your first phone model to enable the customizer</p>
          <button onClick={openAdd} className="px-lg py-sm bg-primary text-on-primary rounded-2xl font-bold">Add First Model</button>
        </div>
      ) : (
        brands.map(brand => (
          <div key={brand} className="mb-xl">
            <h2 className="text-h2 font-bold text-on-surface mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">smartphone</span>
              {brand}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-md">
              {models.filter(m => m.brand === brand).map(m => (
                <div key={m.id} className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/20">
                  <div className="aspect-[3/4] relative bg-surface-container-high">
                    <img src={m.caseImage} alt={m.model} className="w-full h-full object-contain p-sm" />
                  </div>
                  <div className="p-sm">
                    <p className="font-bold text-on-surface text-body-md truncate">{m.model}</p>
                    <div className="flex gap-xs mt-sm">
                      <button onClick={() => openEdit(m)} className="flex-1 py-xs text-xs bg-surface-container-high text-on-surface rounded-lg hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center gap-xs">
                        <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="flex-1 py-xs text-xs bg-surface-container-high text-on-surface rounded-lg hover:bg-error/10 hover:text-error transition-colors flex items-center justify-center gap-xs">
                        <span className="material-symbols-outlined text-[14px]">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-md">
          <div className="bg-surface-container-low rounded-3xl p-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-h2 font-bold mb-lg">{editing ? 'Edit Model' : 'Add Phone Model'}</h2>
            <form onSubmit={handleSave} className="space-y-md">
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-xs block">BRAND *</label>
                  <input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="iPhone, Samsung…" required className="w-full px-sm py-xs rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-xs block">MODEL *</label>
                  <input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} placeholder="iPhone 15 Pro…" required className="w-full px-sm py-xs rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-xs block">CASE PHOTO *</label>
                <div className="flex gap-sm items-start">
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-xs px-md py-sm bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{uploading ? 'hourglass_empty' : 'upload'}</span>
                    {uploading ? 'Uploading…' : 'Upload Photo'}
                  </button>
                  {form.caseImage && (
                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-outline-variant">
                      <img src={form.caseImage} alt="preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              </div>

              <div className="flex gap-sm pt-sm">
                <button type="submit" disabled={saving} className="flex-1 py-sm bg-primary text-on-primary rounded-2xl font-bold hover:opacity-90 disabled:opacity-60">
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Model'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-sm bg-surface-container-high text-on-surface rounded-2xl font-bold hover:bg-outline-variant/30">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
