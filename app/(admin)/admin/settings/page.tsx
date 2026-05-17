'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [storeName,       setStoreName]       = useState('QK Case');
  const [instagramUrl,    setInstagramUrl]    = useState('');
  const [whatsapp,        setWhatsapp]        = useState('');
  const [whatsappAlerts,  setWhatsappAlerts]  = useState(true);
  const [saving,          setSaving]          = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data.store_name)    setStoreName(data.store_name);
      if (data.instagram_url) setInstagramUrl(data.instagram_url);
      if (data.whatsapp_number) setWhatsapp(data.whatsapp_number);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ store_name: storeName, instagram_url: instagramUrl, whatsapp_number: whatsapp }),
    });
    setSaving(false);
    if (res.ok) toast.success('Paramètres sauvegardés');
    else        toast.error('Erreur lors de la sauvegarde');
  };

  return (
    <div className="p-xl max-w-2xl">
      <div className="mb-xl">
        <h1 className="font-h1 text-h1 text-on-surface">Paramètres</h1>
        <p className="text-on-surface-variant">Configurez votre boutique.</p>
      </div>

      <section className="mb-xl">
        <div className="flex items-center gap-sm mb-lg">
          <span className="material-symbols-outlined text-primary">storefront</span>
          <h2 className="font-h2 text-h2 text-on-surface">Profil de la boutique</h2>
        </div>
        <div className="space-y-md">
          <div>
            <label className="block text-body-md text-on-surface mb-xs">Nom de la boutique</label>
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors text-on-surface"
            />
          </div>
          <div>
            <label className="block text-body-md text-on-surface mb-xs">Page Instagram (URL)</label>
            <div className="flex items-center gap-xs px-md py-sm rounded-xl border border-outline-variant bg-surface-container-lowest">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">link</span>
              <input
                type="url"
                value={instagramUrl}
                onChange={e => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/votre_page"
                className="flex-1 bg-transparent border-none focus:outline-none text-on-surface"
              />
            </div>
          </div>
          <div>
            <label className="block text-body-md text-on-surface mb-xs">Numéro WhatsApp</label>
            <div className="flex items-center gap-xs px-md py-sm rounded-xl border border-outline-variant bg-surface-container-lowest">
              <span className="material-symbols-outlined text-on-surface-variant">phone</span>
              <input
                type="text"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="+212 6 00 00 00 00"
                className="flex-1 bg-transparent border-none focus:outline-none text-on-surface"
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-xs">Format international, ex: +212612345678</p>
          </div>
        </div>
      </section>

      <section className="mb-xl">
        <div className="flex items-center gap-sm mb-lg">
          <span className="material-symbols-outlined text-primary">tune</span>
          <h2 className="font-h2 text-h2 text-on-surface">Préférences</h2>
        </div>
        <div className="flex items-center justify-between p-md rounded-xl bg-surface-container-lowest border border-outline-variant/20">
          <div>
            <div className="font-bold text-on-surface">Alertes WhatsApp</div>
            <div className="text-on-surface-variant text-body-md">Notifications pour les nouvelles commandes</div>
          </div>
          <button
            onClick={() => setWhatsappAlerts(v => !v)}
            className={`w-12 h-6 rounded-full transition-colors relative ${whatsappAlerts ? 'bg-primary' : 'bg-surface-container-high'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${whatsappAlerts ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </section>

      <section className="mb-xl">
        <div className="flex items-center gap-sm mb-lg">
          <span className="material-symbols-outlined text-primary">security</span>
          <h2 className="font-h2 text-h2 text-on-surface">Sécurité</h2>
        </div>
        <div className="flex items-center justify-between p-md rounded-xl bg-surface-container-lowest border border-outline-variant/20">
          <div>
            <div className="font-bold text-on-surface">Changer le mot de passe</div>
            <div className="text-on-surface-variant text-body-md">Mettre à jour votre mot de passe admin</div>
          </div>
          <button className="px-md py-xs border border-outline-variant rounded-xl font-bold text-on-surface hover:bg-surface-container-low transition-colors">
            Modifier
          </button>
        </div>
      </section>

      <div className="flex gap-md">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-xl py-sm bg-gradient-to-r from-primary to-tertiary text-on-primary rounded-xl font-bold hover:scale-[1.01] transition-transform shadow-lg disabled:opacity-60"
        >
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </button>
      </div>
    </div>
  );
}
