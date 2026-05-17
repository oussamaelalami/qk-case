'use client';

import { useState, useEffect } from 'react';

interface BarData     { label: string; count: number; }
interface PopularItem { id: string; name: string; image: string; count: number; }
interface ChartData   { daily: BarData[]; monthly: BarData[]; popular: PopularItem[]; }

const VIEWS = [
  { key: 'Daily',   label: 'Journalier' },
  { key: 'Monthly', label: 'Mensuel'    },
] as const;
type View = typeof VIEWS[number]['key'];

export function DashboardCharts() {
  const [data, setData] = useState<ChartData | null>(null);
  const [view, setView] = useState<View>('Daily');

  useEffect(() => {
    fetch('/api/admin/chart-data').then(r => r.json()).then(setData);
  }, []);

  const bars     = view === 'Daily' ? (data?.daily ?? []) : (data?.monthly ?? []);
  const maxCount = Math.max(...bars.map(b => b.count), 0);
  const hasData  = maxCount > 0;

  if (!data) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/20 shadow-sm h-64 animate-pulse" />
        <div className="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/20 shadow-sm h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
      {/* Commandes dans le temps */}
      <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/20 shadow-sm">
        <div className="flex justify-between items-center mb-lg">
          <h2 className="font-h2 text-h2 text-on-surface">Commandes dans le temps</h2>
          <div className="flex gap-xs">
            {VIEWS.map(v => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`px-sm py-xs rounded-full text-label-caps font-label-caps transition-colors ${
                  view === v.key ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {hasData ? (
          <div className="flex items-end gap-2 px-1" style={{ height: '140px' }}>
            {bars.map((bar, i) => {
              const barPx     = Math.max(Math.round((bar.count / maxCount) * 112), bar.count > 0 ? 12 : 4);
              const isHighest = bar.count === maxCount;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex justify-center">
                    <span className="absolute -top-5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {bar.count}
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isHighest
                        ? 'bg-gradient-to-t from-primary to-tertiary'
                        : bar.count > 0
                          ? 'bg-primary/30'
                          : 'bg-surface-container-high'
                    }`}
                    style={{ height: `${barPx}px` }}
                  />
                  <span className="text-on-surface-variant text-xs">{bar.label}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-on-surface-variant" style={{ height: '140px' }}>
            <span className="material-symbols-outlined text-[40px] opacity-30">bar_chart</span>
            <p className="text-sm">Aucune commande sur cette période.</p>
          </div>
        )}
      </div>

      {/* Collections populaires */}
      <div className="bg-surface-container-lowest rounded-2xl p-lg border border-outline-variant/20 shadow-sm">
        <h2 className="font-h2 text-h2 text-on-surface mb-lg">Collections populaires</h2>
        {data.popular.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-on-surface-variant py-lg">
            <span className="material-symbols-outlined text-[40px] opacity-30">auto_awesome</span>
            <p className="text-sm text-center">Aucune commande de design encore.</p>
          </div>
        ) : (
          <div className="space-y-sm">
            {data.popular.map((col, i) => (
              <div key={col.id} className="flex items-center gap-sm p-sm rounded-xl hover:bg-surface-container-low transition-colors">
                <span className="text-xs font-bold text-on-surface-variant w-4 text-center">{i + 1}</span>
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high">
                  {col.image ? (
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-xl">image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-on-surface text-sm truncate">{col.name}</div>
                  <div className="text-on-surface-variant text-xs">
                    {col.count} commande{col.count > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
