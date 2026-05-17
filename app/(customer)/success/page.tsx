'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const image = searchParams.get('image');
  const name  = searchParams.get('name');
  const designImage = image ? decodeURIComponent(image) : null;
  const designName  = name  ? decodeURIComponent(name)  : 'Votre coque personnalisée';

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center mb-6 shadow-2xl shadow-primary/30"
      >
        <span className="material-symbols-outlined text-white text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          check
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h1 className="text-2xl font-extrabold text-on-surface mb-2">
          Commande envoyée !
        </h1>
        <p className="text-on-surface-variant text-center max-w-sm mb-8 text-sm leading-relaxed">
          Votre demande a été reçue. Le responsable vous contactera sous peu pour confirmer.
        </p>
      </motion.div>

      {designImage && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col items-center gap-3"
        >
          <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">
            Votre Design
          </p>
          <div className="w-48 h-48 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 bg-surface-container-low">
            <img src={designImage} alt={designName} className="w-full h-full object-cover" />
          </div>
          <p className="text-sm font-semibold text-on-surface">{designName}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface-container-low border border-white/5 rounded-2xl p-5 w-full max-w-xs mb-8"
      >
        <p className="text-[10px] font-semibold tracking-widest text-primary uppercase mb-3">
          Prochaines étapes
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <span className="text-on-surface">Commande reçue</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base opacity-40">radio_button_unchecked</span>
            <span>Confirmation par message</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base opacity-40">radio_button_unchecked</span>
            <span>Impression &amp; Livraison</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex flex-col items-center gap-3"
      >
        <Link
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 text-sm"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/browse"
          className="text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          Explorer d&apos;autres designs →
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
