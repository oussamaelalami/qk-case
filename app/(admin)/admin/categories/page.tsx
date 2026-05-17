'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  _count: { designs: number };
}

const empty = { name: '', slug: '', image: '', sortOrder: 0, active: true };

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading,    setLoading]    = useState(true);

  const [modal,     setModal]     = useState<'add' | 'edit' | null>(null);
  const [editing,   setEditing]   = useState<Category | null>(null);
  const [form,      setForm]      = useState(empty);
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res  = await fetch('/api/admin/categories');
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setModal('add');
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, image: cat.image ?? '', sortOrder: cat.sortOrder, active: cat.active });
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
      setForm(f => ({ ...f, image: data.url }));
      toast.success('Image uploaded');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast.error('Name and slug are required'); return; }
    setSaving(true);
    const body   = { ...form, sortOrder: Number(form.sortOrder) };
    const url    = modal === 'edit' ? `/api/admin/categories/${editing!.id}` : '/api/admin/categories';
    const method = modal === 'edit' ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setSaving(false);

    if (res.ok) {
      toast.success(modal === 'edit' ? 'Category updated' : 'Category created');
      closeModal();
      fetchCategories();
    } else {
      const err = await res.json();
      toast.error(err.error ?? 'Failed to save category');
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category? Designs inside will become uncategorised.')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Category deleted'); fetchCategories(); }
    else toast.error('Failed to delete category');
  };

  return (
    <div className="p-4 lg:p-xl">
      <div className="flex justify-between items-start mb-6 lg:mb-xl gap-3">
        <div className="min-w-0">
          <h1 className="font-h1 text-h1 text-on-surface">Categories</h1>
          <p className="text-on-surface-variant hidden sm:block">Organize your design collections.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex-shrink-0 flex items-center gap-xs px-3 py-2 lg:px-md lg:py-sm bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg text-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="hidden sm:inline">New Category</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-md">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-outline-variant/20">
              <div className="aspect-[4/3] bg-surface-container-high animate-pulse" />
              <div className="p-md space-y-xs">
                <div className="h-4 bg-surface-container-high rounded animate-pulse" />
                <div className="h-4 bg-surface-container-high rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center text-on-surface-variant py-xl">No categories yet. Create one to get started.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-md">
          {categories.map(cat => (
            <div key={cat.id} className={`bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden group ${!cat.active ? 'opacity-60' : ''}`}>
              <div className="aspect-[4/3] relative overflow-hidden bg-surface-container-high">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[48px]">category</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-xs">
                    <button
                      onClick={() => openEdit(cat)}
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-on-surface">{cat.name}</h3>
                    <p className="text-on-surface-variant text-body-md">{cat._count.designs} designs</p>
                  </div>
                  <span className={`px-xs py-[2px] rounded-full text-label-caps font-label-caps ${cat.active ? 'bg-green-100 text-green-700' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    {cat.active ? 'ACTIVE' : 'HIDDEN'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-md border-b border-outline-variant/20">
              <h2 className="font-bold text-on-surface text-lg">{modal === 'add' ? 'New Category' : 'Edit Category'}</h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="p-md space-y-3">
              <Field label="Name *">
                <input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Abstract Art" className={inputCls} />
              </Field>
              <Field label="Slug *">
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="abstract-art" className={inputCls} />
              </Field>
              <Field label="Sort Order">
                <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} min="0" className={inputCls} />
              </Field>

              {/* Image */}
              <Field label="Category Image">
                <div className="space-y-2">
                  {form.image && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-outline-variant/30">
                      <img src={form.image} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setForm(f => ({ ...f, image: '' }))}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                      >×</button>
                    </div>
                  )}
                  <input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="Paste image URL…"
                    className={inputCls}
                  />
                  <label className={`flex items-center gap-2 px-3 py-2 border border-dashed border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors text-sm text-on-surface-variant ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    <span className="material-symbols-outlined text-base">{uploading ? 'hourglass_empty' : 'upload'}</span>
                    {uploading ? 'Uploading…' : 'Upload image'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ''; }} />
                  </label>
                </div>
              </Field>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-on-surface">
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="accent-primary w-4 h-4" />
                Active (visible to customers)
              </label>

              <div className="flex gap-2 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 border border-outline-variant rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60">
                  {saving ? 'Saving…' : modal === 'add' ? 'Create Category' : 'Save Changes'}
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
