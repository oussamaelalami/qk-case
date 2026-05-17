import Link from 'next/link';
import { supabase } from '@/lib/supabase';

async function getSettings() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('instagram_url, whatsapp_number')
      .single();
    return data ?? { instagram_url: '', whatsapp_number: '' };
  } catch {
    return { instagram_url: '', whatsapp_number: '' };
  }
}

export async function Footer() {
  const settings = await getSettings();
  const waNumber = settings.whatsapp_number.replace(/\D/g, '');
  const waLink   = waNumber ? `https://wa.me/${waNumber}` : '#';
  const igLink   = settings.instagram_url || '#';

  return (
    <footer className="bg-surface-container-low border-t border-white/5 py-xl px-gutter">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-xl mb-xl">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block font-display text-h2 font-extrabold tracking-tighter text-gradient mb-sm"
            >
              QK Case
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-[200px]">
              Coques personnalisées de qualité premium pour le marché marocain.
            </p>
            <div className="flex gap-sm mt-md">
              <a
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-label-caps font-label-caps text-on-surface-variant/60 tracking-[0.12em] mb-md">
              SHOP
            </h4>
            <ul className="space-y-sm">
              <li>
                <Link
                  href="/browse"
                  className="text-on-surface-variant hover:text-on-surface text-sm transition-colors duration-200"
                >
                  Tous les designs
                </Link>
              </li>
              <li>
                <Link
                  href="/customizer"
                  className="text-on-surface-variant hover:text-on-surface text-sm transition-colors duration-200"
                >
                  Coque personnalisée
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label-caps font-label-caps text-on-surface-variant/60 tracking-[0.12em] mb-md">
              CONTACT
            </h4>
            <ul className="space-y-sm">
              <li>
                <a
                  href={igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-on-surface text-sm transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-on-surface text-sm transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-label-caps font-label-caps text-on-surface-variant/60 tracking-[0.12em] mb-md">
              CRÉEZ
            </h4>
            <p className="text-on-surface-variant text-sm mb-md leading-relaxed">
              Commencez à personnaliser votre coque dès maintenant.
            </p>
            <Link
              href="/customizer"
              className="inline-flex items-center gap-xs px-md py-xs bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
            >
              Commencer →
            </Link>
          </div>
        </div>

        <div className="pt-md border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-sm">
          <span className="text-on-surface-variant text-sm">© 2025 QK Case. Tous droits réservés.</span>
          <span className="text-on-surface-variant/30 text-sm">Made with ♥ in Maroc</span>
        </div>
      </div>
    </footer>
  );
}
