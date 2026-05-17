'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Category { id: string; name: string; }
interface Design {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  active: boolean;
  featured: boolean;
  description?: string;
  categoryId: string;
  category: { name: string; slug: string };
}

const empty = { name: '', slug: '', description: '', price: '', images: [] as string[], categoryId: '', featured: false, active: true };

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function DesignsPage() {
  const [designs,    setDesigns]    = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [page,       setPage]       = useState(1);

  const [modal,    setModal]    = useState<'add' | 'edit' | null>(null);
  const [editing,  setEditing]  = useState<Design | null>(null);
  const [form,     setForm]     = useState(empty);
  const [saving,   setSaving]   = useState(false);
  const [imgInput, setImgInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchDesigns = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    const res  = await fetch(`/api/admin/designs?${params}`);
    const data = await res.json();
    setDesigns(data.designs ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res  = await fetch('/api/admin/categories');
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchDesigns(); }, [page]);
  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setImgInput('');
    setModal('add');
  };

  const openEdit = (d: Design) => {
    setEditing(d);
    setForm({ name: d.name, slug: d.slug, description: d.description ?? '', price: String(d.price), images: [...d.images], categoryId: d.categoryId, featured: d.featured, active: d.active });
    setImgInput('');
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditing(null); };

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, ...(modal === 'add' ? { slug: slugify(name) } : {}) }));
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res  = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm(f => ({ ...f, images: [...f.images, data.url] }));
      toast.success('Image uploaded');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally { setUploading(false); }
  };

  const addImageUrl = () => {
    const url = imgInput.trim();
    if (!url) return;
    try { new URL(url); } catch { toast.error('Invalid URL'); return; }
    setForm(f => ({ ...f, images: [...f.images, url] }));
    setImgInput('');
  };

  const removeImage = (i: number) =>
    setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.categoryId || form.images.length === 0) {
      toast.error('Name, slug, category and at least one image are required');
      return;
    }
    const price = parseFloat(form.price as string);
    if (isNaN(price) || price <= 0) { toast.error('Invalid price'); return; }

    setSaving(true);
    const body = { ...form, price, images: form.images };
    const url    = modal === 'edit' ? `/api/admin/designs/${editing!.id}` : '/api/admin/designs';
    const method = modal === 'edit' ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);

    if (res.ok) {
      toast.success(modal === 'edit' ? 'Design updated' : 'Design created');
      closeModal();
      fetchDesigns();
    } else {
      const err = await res.json();
      toast.error(err.error ?? 'Failed to save design');
    }
  };

  const deleteDesign = async (id: string) => {
    if (!confirm('Delete this design?')) return;
    const res = await fetch(`/api/admin/designs/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Design deleted'); fetchDesigns(); }
    else toast.error('Failed to delete design');
  };

  const filtered = search ? designs.filter(d => d.name.toLowerCase().includes(search.toLowerCase())) : designs;

  return (
    <div className="p-4 lg:p-xl">
      <div className="flex justify-between items-start mb-6 lg:mb-xl gap-3">
        <div className="min-w-0">
          <h1 className="font-h1 text-h1 text-on-surface">Manage Designs</h1>
          <p className="text-on-surface-variant hidden sm:block">Curate your smartphone case collection.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex-shrink-0 flex items-center gap-xs px-3 py-2 lg:px-md lg:py-sm bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg text-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="hidden sm:inline">Add New Design</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="flex gap-md mb-6 lg:mb-xl">
        <div className="flex items-center bg-surface-container-low rounded-xl px-md py-sm border border-outline-variant/20 flex-1 max-w-md">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search designs..."
            className="bg-transparent border-none focus:outline-none text-body-md px-xs flex-1"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-md">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-outline-variant/20">
              <div className="aspect-[3/4] bg-surface-container-high animate-pulse" />
              <div className="p-sm space-y-xs">
                <div className="h-4 bg-surface-container-high rounded animate-pulse" />
                <div className="h-4 bg-surface-container-high rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-on-surface-variant py-xl">No designs found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-md">
          {filtered.map(design => (
            <div key={design.id} className={`bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden group ${!design.active ? 'opacity-60' : ''}`}>
              <div className="aspect-[3/4] relative overflow-hidden">
                {design.featured && (
                  <div className="absolute top-sm left-sm z-10 px-sm py-xs bg-primary text-on-primary rounded-full text-label-caps font-label-caps">
                    FEATURED
                  </div>
                )}
                <img
                  src={design.images[0]}
                  alt={design.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-xs">
                    <button
                      onClick={() => openEdit(design)}
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => deleteDesign(design.id)}
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-on-surface hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-sm">
                <h3 className="font-bold text-on-surface mb-xs truncate">{design.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-body-md">{design.category?.name}</span>
                  <span className="text-primary font-bold">{design.price} MAD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-xl">
        <span className="text-on-surface-variant text-body-md">Total: {total} designs</span>
        <div className="flex gap-xs">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center disabled:opacity-40 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <span className="px-sm font-bold text-on-surface">{page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={designs.length < 20} className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center disabled:opacity-40 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-md border-b border-outline-variant/20">
              <h2 className="font-bold text-on-surface text-lg">{modal === 'add' ? 'Add New Design' : 'Edit Design'}</h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="p-md space-y-3">
              <Field label="Name *">
                <input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Galaxy Stars" className={inputCls} />
              </Field>
              <Field label="Slug *">
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="galaxy-stars" className={inputCls} />
              </Field>
              <Field label="Category *">
                <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))} className={inputCls}>
                  <option value="">Select category…</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Price (MAD) *">
                <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="19.99" min="0" step="0.01" className={inputCls} />
              </Field>
              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description…" rows={2} className={inputCls + ' resize-none'} />
              </Field>

              {/* Images */}
              <Field label="Images *">
                <div className="space-y-2">
                  {form.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.images.map((url, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-outline-variant/30">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center leading-none"
                          >×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      value={imgInput}
                      onChange={e => setImgInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                      placeholder="Paste image URL…"
                      className={inputCls + ' flex-1'}
                    />
                    <button onClick={addImageUrl} className="px-3 py-2 bg-surface-container-high rounded-xl text-sm font-semibold hover:bg-surface-container transition-colors">Add URL</button>
                  </div>
                  <label className={`flex items-center gap-2 px-3 py-2 border border-dashed border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors text-sm text-on-surface-variant ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    <span className="material-symbols-outlined text-base">{uploading ? 'hourglass_empty' : 'upload'}</span>
                    {uploading ? 'Uploading…' : 'Upload image'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ''; }} />
                  </label>
                </div>
              </Field>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-on-surface">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-primary w-4 h-4" />
                  Featured
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-on-surface">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="accent-primary w-4 h-4" />
                  Active
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60">
                  {saving ? 'Saving…' : modal === 'add' ? 'Create Design' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = 'w-full px-3 py-2 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm focus:outline-none focus:border-primary';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase mb-1">{label}</label>
      {children}
    </div>
  );
}
