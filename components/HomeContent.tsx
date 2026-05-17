'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const testimonialAvatars = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1tuUHABt5xsYEAJ1R26p6lrwRCtDbA672Syg_TpXBV-_7QENBixow0R6Q1zbugSbmAaOQv0TqqAkvYkzrESno9n_B6dPuLZXu4WhDAAyiB7-Jl_cWvrOsuZI2XNAWjDmd_dW6-fqA66NYFt7-4BqUsuTIMuSpMDpX0seUTxpmiaXWAxpOdLIXqH9u3uA3wcmggospnbD2jSyeXMwz3emuZVWlFoTWXkFnoBQqE9R2KudLyGi73opBgmCi0Lxrb9OSS5OMjoUQm4g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgQke2zmgYBNInFsGw6KlH_4_q8Qnc_6j9L0D5rZS_s_tGD_T6ZnrFTxcTc9w8zcY_O0ItKaycHVfCu4lQwn_wBzDXlG0tSyFTQfr7hSYMQJVrP8UrDJzji9cPTarrHzKSMPr2zFAScgd5EEzZtG0gSDzpSdmXUHgfXHFCJPMCfVqCuqQBQ8rGbfJDY7mbPhI5mYs6WFMrs7CbnSghiV0N5VE4eqPqsdivl59Xk_pmMP8im78btXz128Jfas-t_og3QQlP1KaOjg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCbvZPHExijYV6fUnxg3h9QFyk3fWqCq1xaQnZG1rZkP21aub3SmX0JO7Pd3AsqmgbC2j0jDhC0cx1GJqPq6ahVmO6hhi9NjDAGOO6uuUH9N9bBF_zpKopuB-ibEHJjwP5sxO8xUP-b5cATB2QcoWDtkppUROh4nII6xG_ZA_hDp0KAgZiwWchS-Pq0xXYpcABibfpdrALKNqOmqm4kYAhQfaMVajJDapHoseXrCH1X5EdGLM-CCPRuvRPZ_QdzraSrxMeBf4jSFGA',
];

const marqueeItems = [
  'PREMIUM', 'CUSTOM', 'UNIQUE', 'MAROC', 'LIVRAISON', 'QUALITÉ',
  'PREMIUM', 'CUSTOM', 'UNIQUE', 'MAROC', 'LIVRAISON', 'QUALITÉ',
];

interface FeaturedDesign {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string; slug: string } | null;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

interface Props {
  featuredDesigns: FeaturedDesign[];
  categories: CategoryItem[];
}

// Scroll-triggered fade-up reveal
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HomeContent({ featuredDesigns, categories }: Props) {
  const { t } = useI18n();

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        {/* Ambient background orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[65%] bg-primary/8 blur-[160px] rounded-full animate-glow-pulse"
          />
          <div
            className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[55%] bg-tertiary/8 blur-[160px] rounded-full animate-glow-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div className="absolute top-[35%] left-[35%] w-[35%] h-[35%] bg-secondary/4 blur-[120px] rounded-full" />
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,200,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,200,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-gutter grid grid-cols-1 lg:grid-cols-2 gap-xl items-center pt-[120px] pb-lg flex-1">
          {/* Left – text */}
          <div className="space-y-lg">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-xs px-sm py-xs bg-primary/10 border border-primary/20 rounded-full"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-label-caps font-label-caps text-primary">{t.home.hero_badge}</span>
            </motion.div>

            <motion.h1
              className="font-display text-[56px] md:text-[72px] leading-[1.0] font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.home.hero_title}
              <br />
              <span className="text-gradient">{t.home.hero_title_accent}</span>
            </motion.h1>

            <motion.p
              className="font-body-lg text-on-surface-variant max-w-[500px] leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.home.hero_subtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-md"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/browse"
                className="group relative px-xl py-md bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10">{t.home.cta_browse}</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-200" />
              </Link>
              <Link
                href="/customizer"
                className="px-xl py-md bg-surface-container-high border border-white/8 text-on-surface rounded-2xl font-bold hover:bg-surface-container-highest hover:border-white/15 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
              >
                {t.home.cta_customize}
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-lg text-on-surface-variant text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {['500+ designs', 'Livraison Maroc', 'Qualité premium'].map((item) => (
                <div key={item} className="flex items-center gap-xs">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – floating product image */}
          <motion.div
            className="flex items-center justify-center overflow-visible"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[640px] scale-110 lg:scale-125">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 translate-y-10" />
              <img
                src="/hero.png"
                alt="QK Case designs"
                className="relative w-full h-auto animate-float"
                style={{
                  filter:
                    'drop-shadow(0 50px 80px rgba(124,127,250,0.3)) drop-shadow(0 15px 30px rgba(0,0,0,0.65))',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Marquee band */}
        <div className="relative z-10 w-full border-t border-b border-white/5 py-md overflow-hidden bg-surface-container-low/40">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-lg mx-lg text-label-caps font-label-caps text-on-surface-variant/40 tracking-[0.2em]"
              >
                {item}
                <span className="w-1 h-1 bg-primary/30 rounded-full" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRENDING DESIGNS ═══════════════════════ */}
      <section className="py-xl px-gutter">
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="flex items-end justify-between mb-xl">
            <div>
              <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.15em]">
                TENDANCES
              </div>
              <h2 className="font-h1 text-h1 text-on-surface">{t.home.trending_title}</h2>
              <p className="text-on-surface-variant mt-xs">{t.home.trending_subtitle}</p>
            </div>
            <Link
              href="/browse"
              className="hidden md:flex items-center gap-xs text-primary hover:gap-sm transition-all duration-200 font-medium text-sm"
            >
              Voir tout →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            {featuredDesigns.length > 0
              ? featuredDesigns.map((design, i) => (
                  <FadeUp key={design.id} delay={i * 0.08}>
                    <Link
                      href={`/designs/${design.slug}`}
                      className="group block bg-surface-container-low border border-white/5 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
                        <img
                          src={design.images[0]}
                          alt={design.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {design.category && (
                          <div className="absolute top-sm left-sm">
                            <span className="px-xs py-[2px] bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-label-caps font-label-caps text-white/80">
                              {design.category.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-sm">
                        <h3 className="font-bold text-on-surface mb-xs group-hover:text-primary transition-colors duration-200">
                          {design.name}
                        </h3>
                        <span className="text-primary font-bold">{design.price} MAD</span>
                      </div>
                    </Link>
                  </FadeUp>
                ))
              : [0, 1, 2, 3].map((i) => (
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
      </section>

      {/* ═══════════════════════ CATEGORIES ═════════════════════════ */}
      <section className="py-xl px-gutter" style={{ background: 'linear-gradient(180deg, #08080f 0%, #0a0a16 100%)' }}>
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-xl">
            <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.15em]">
              COLLECTION
            </div>
            <h2 className="font-h1 text-h1 mb-sm">{t.home.categories_title}</h2>
            <p className="text-on-surface-variant">{t.home.categories_subtitle}</p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
            {categories.map((cat, i) => (
              <FadeUp key={cat.id} delay={i * 0.06}>
                <Link
                  href={`/browse?category=${cat.slug}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden block border border-white/5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-tertiary/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-sm pb-md">
                    <span className="text-white font-bold text-center text-sm leading-tight">
                      {cat.name}
                    </span>
                  </div>
                  <div className="absolute top-sm right-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center text-white text-xs font-bold">
                      →
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}

            <FadeUp delay={categories.length * 0.06}>
              <Link
                href="/customizer"
                className="group relative aspect-square rounded-2xl block border border-primary/15 hover:border-primary/40 bg-gradient-to-br from-primary/8 to-tertiary/8 hover:from-primary/15 hover:to-tertiary/15 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-md text-center">
                  <span className="material-symbols-outlined text-primary text-[36px] mb-xs group-hover:scale-110 transition-transform duration-200">
                    add_a_photo
                  </span>
                  <span className="text-on-surface font-bold text-sm">Custom</span>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════════════ */}
      <section className="py-xl px-gutter">
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-xl">
            <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.15em]">
              PROCESSUS
            </div>
            <h2 className="font-h1 text-h1">{t.home.steps_title}</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[38px] left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px bg-gradient-to-r from-primary/20 via-tertiary/30 to-secondary/20" />

            {[
              { icon: 'smartphone',     title: t.home.step1_title, desc: t.home.step1_desc, color: 'primary',   delay: 0 },
              { icon: 'palette',        title: t.home.step2_title, desc: t.home.step2_desc, color: 'tertiary',  delay: 0.12 },
              { icon: 'local_shipping', title: t.home.step3_title, desc: t.home.step3_desc, color: 'secondary', delay: 0.24 },
            ].map((step, i) => (
              <FadeUp key={step.title} delay={step.delay} className="flex flex-col items-center text-center">
                <div className={`relative w-20 h-20 rounded-full bg-${step.color}/10 border border-${step.color}/20 flex items-center justify-center mb-lg shadow-lg z-10`}>
                  <span className={`material-symbols-outlined text-${step.color} text-[30px]`}>
                    {step.icon}
                  </span>
                </div>
                <div className="text-label-caps font-label-caps text-on-surface-variant/50 mb-sm">
                  0{i + 1}
                </div>
                <h3 className="font-h2 text-h2 mb-sm">{step.title}</h3>
                <p className="text-on-surface-variant max-w-[260px] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════════════ */}
      <section className="py-xl px-gutter" style={{ background: 'linear-gradient(180deg, #08080f 0%, #0a0a16 100%)' }}>
        <div className="max-w-[1280px] mx-auto">
          <FadeUp className="text-center mb-xl">
            <div className="text-label-caps font-label-caps text-primary mb-xs tracking-[0.15em]">
              AVIS CLIENTS
            </div>
            <h2 className="font-h1 text-h1">{t.home.testimonials_title}</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {t.home.testimonials.map((testimonial, i) => (
              <FadeUp key={testimonial.name} delay={i * 0.1}>
                <div
                  className={`p-lg rounded-2xl h-full transition-all duration-300 ${
                    testimonial.featured
                      ? 'gradient-border shadow-2xl shadow-primary/10 scale-[1.02]'
                      : 'bg-surface-container-low border border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-sm mb-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
                      <img
                        src={testimonialAvatars[i]}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{testimonial.name}</h4>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, j) => (
                          <span
                            key={j}
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-on-surface-variant italic leading-relaxed text-sm">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ CTA BANNER ═══════════════════════════ */}
      <section className="py-xl px-gutter">
        <FadeUp>
          <div className="max-w-[1280px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/5 p-xl md:p-[80px] text-center bg-surface-container-low">
              {/* Glow orbs inside banner */}
              <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[60%] bg-tertiary/8 blur-[100px] rounded-full pointer-events-none" />
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,200,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

              <div className="relative z-10">
                <div className="text-label-caps font-label-caps text-primary mb-md tracking-[0.15em]">
                  COMMENCEZ MAINTENANT
                </div>
                <h2 className="font-display text-[40px] md:text-[56px] font-extrabold tracking-tight mb-md leading-tight">
                  Créez votre coque
                  <br />
                  <span className="text-gradient">unique aujourd&apos;hui</span>
                </h2>
                <p className="text-on-surface-variant mb-xl max-w-md mx-auto leading-relaxed">
                  Choisissez parmi nos designs ou uploadez votre propre image pour une coque 100% personnalisée.
                </p>
                <div className="flex flex-wrap gap-md justify-center">
                  <Link
                    href="/customizer"
                    className="px-xl py-md bg-gradient-to-r from-primary to-tertiary text-white rounded-2xl font-bold hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/35"
                  >
                    Personnaliser maintenant
                  </Link>
                  <Link
                    href="/browse"
                    className="px-xl py-md bg-surface-container-high border border-white/8 text-on-surface rounded-2xl font-bold hover:bg-surface-container-highest hover:border-white/15 transition-all"
                  >
                    Voir les designs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
