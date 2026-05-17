'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

interface Design {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

function BrowseContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'all';
  const [activeTab,  setActiveTab]  = useState(initialCategory);
  const [designs,    setDesigns]    = useState<Design[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '24' });
    if (activeTab !== 'all') params.set('category', activeTab);
    fetch(`/api/designs?${params}`)
      .then(r => r.json())
      .then(data => {
        setDesigns(data.designs ?? []);
        setLoading(false);
      });
  }, [activeTab]);

  const filtered = search
    ? designs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    : designs;

  return (
    <div className="max-w-[1280px] mx-auto px-gutter">
      {/* Page header */}
      <div className="pt-xl pb-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.15em]">
            CATALOGUE
          </div>
          <h1 className="font-display text-[40px] md:text-[52px] font-extrabold tracking-tight text-on-surface mb-lg">
            Tous les designs
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-md gap-md"
        >
          <div className="flex items-center bg-surface-container-low border border-white/5 rounded-full px-md py-xs flex-1 max-w-sm focus-within:border-primary/30 focus-within:bg-surface-container transition-all duration-200">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
            <input
              type="text"
              placeholder={t.browse.search_placeholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-body-md flex-1 px-xs text-on-surface placeholder:text-on-surface-variant"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-on-surface-variant hover:text-on-surface transition-colors ml-xs"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <span className="text-on-surface-variant text-sm hidden md:block">
            {filtered.length} design{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Category filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-sm flex-wrap"
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`px-md py-xs rounded-full text-label-caps font-label-caps transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-surface-container-low border border-white/5 text-on-surface-variant hover:border-white/10 hover:text-on-surface'
            }`}
          >
            {t.browse.filter_all}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-md py-xs rounded-full text-label-caps font-label-caps transition-all duration-200 ${
                activeTab === cat.slug
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface-container-low border border-white/5 text-on-surface-variant hover:border-white/10 hover:text-on-surface'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Design grid */}
      <div className="pb-xl">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-white/5">
                <div className="aspect-[3/4] skeleton-dark" />
                <div className="p-sm space-y-xs">
                  <div className="h-4 skeleton-dark rounded" />
                  <div className="h-4 skeleton-dark rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-xl text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[48px] mb-md block opacity-30">
              search_off
            </span>
            <p>{t.browse.no_results}</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((design, i) => (
                <motion.div
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.04, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/designs/${design.slug}`}
                    className="group bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden block hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
                      <img
                        src={design.images[0]}
                        alt={design.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-sm">
                      <div className="flex justify-between items-start mb-xs">
                        <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors duration-200 text-sm">
                          {design.name}
                        </h3>
                        <span className="text-primary font-bold text-sm ml-xs flex-shrink-0">
                          {design.price} MAD
                        </span>
                      </div>
                      <span className="px-xs py-[2px] bg-surface-container rounded-full text-label-caps font-label-caps text-on-surface-variant">
                        {design.category.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1280px] mx-auto px-gutter py-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-white/5">
                <div className="aspect-[3/4] skeleton-dark" />
                <div className="p-sm space-y-xs">
                  <div className="h-4 skeleton-dark rounded" />
                  <div className="h-4 skeleton-dark rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
