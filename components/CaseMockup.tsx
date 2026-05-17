'use client';

import { useMemo } from 'react';
import { PHONE_DB } from '@/lib/phone-db';
import { generateBase, generateOverlay, adjustBrightness } from '@/lib/case-generator';

export const CASE_COLORS = [
  { id: 'white',  label: 'Pure White',    fill: '#f0f0f0', stroke: '#c8c8c8' },
  { id: 'cream',  label: 'Cream',         fill: '#f5f0e6', stroke: '#d8cfc0' },
  { id: 'black',  label: 'Matte Black',   fill: '#1e1e1e', stroke: '#2e2e2e' },
  { id: 'navy',   label: 'Midnight Blue', fill: '#1a2540', stroke: '#243056' },
  { id: 'forest', label: 'Forest Green',  fill: '#1a2e1e', stroke: '#243a28' },
  { id: 'rose',   label: 'Dusty Rose',    fill: '#3a2228', stroke: '#4a3038' },
  { id: 'sand',   label: 'Sand',          fill: '#c8b89a', stroke: '#b0a080' },
  { id: 'lavend', label: 'Lavender',      fill: '#d4c8e8', stroke: '#b8aad0' },
  { id: 'slate',  label: 'Slate',         fill: '#4a5468', stroke: '#5a6480' },
  { id: 'rust',   label: 'Rust',          fill: '#7a3520', stroke: '#903e26' },
  { id: 'teal',   label: 'Dark Teal',     fill: '#183838', stroke: '#204848' },
];

interface CaseMockupProps {
  brand: string;
  model: string;
  designURL?: string | null;
  caseColor?: string;
  imageFit?: 'cover' | 'contain' | 'none';
  onUploadClick?: () => void;
  uploading?: boolean;
  /** Max height in px the mockup should occupy (default 520) */
  maxHeight?: number;
  /** Max width in px the mockup should occupy (default 240) */
  maxWidth?: number;
}

export function CaseMockup({
  brand,
  model,
  designURL,
  caseColor = 'white',
  imageFit = 'cover',
  onUploadClick,
  uploading = false,
  maxHeight = 520,
  maxWidth = 240,
}: CaseMockupProps) {
  const config = PHONE_DB[brand]?.models[model];
  const id = `${brand}_${model}`.replace(/-/g, '_');

  const { baseSVG, overlaySVG } = useMemo(() => {
    if (!config) return { baseSVG: '', overlaySVG: '' };

    const colorObj = CASE_COLORS.find(c => c.id === caseColor) ?? CASE_COLORS[0];

    // Inject case color by replacing the default white/gray tokens in the generated SVG
    let base = generateBase(config, id);
    base = base
      .replace(/fill="#f0f0f0"/g, `fill="${colorObj.fill}"`)
      .replace(/fill="#e8e8e8"/g, `fill="${adjustBrightness(colorObj.fill, -8)}"`)
      .replace(/stroke="#c8c8c8"/g, `stroke="${colorObj.stroke}"`)
      .replace(/fill="#d0d0d0"/g, `fill="${adjustBrightness(colorObj.fill, -15)}"`)
      .replace(/stroke="#b8b8b8"/g, `stroke="${adjustBrightness(colorObj.stroke, -10)}"`);

    return { baseSVG: base, overlaySVG: generateOverlay(config, id) };
  }, [brand, model, caseColor, config, id]);

  if (!config) return null;

  const vbParts = config.viewBox.split(' ').map(Number);
  const nativeW = vbParts[2];
  const nativeH = vbParts[3];
  const scale   = Math.min(maxHeight / nativeH, maxWidth / nativeW);
  const displayW = Math.round(nativeW * scale);
  const displayH = Math.round(nativeH * scale);

  // Use full case body bounds for design area (matches the reference static app)
  const dLeft    = (config.caseX / nativeW) * 100;
  const dTop     = (config.caseY / nativeH) * 100;
  const dWidth   = (config.caseW / nativeW) * 100;
  const dHeight  = (config.caseH / nativeH) * 100;
  // Separate H/V radii so corners stay circular on a tall rectangle
  const dRadiusX = (config.rx / config.caseW) * 100;
  const dRadiusY = (config.rx / config.caseH) * 100;

  const sizedBase    = baseSVG.replace('<svg', `<svg width="${displayW}" height="${displayH}"`);
  const sizedOverlay = overlaySVG.replace('<svg', `<svg width="${displayW}" height="${displayH}"`);

  return (
    <div
      className="relative select-none"
      style={{ width: displayW, height: displayH, filter: 'drop-shadow(0 28px 50px rgba(0,0,0,0.70)) drop-shadow(0 6px 14px rgba(0,0,0,0.40)) drop-shadow(-5px 0 12px rgba(0,0,0,0.18))' }}
    >
      {/* Base SVG — case body, camera, buttons */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1 }}
        dangerouslySetInnerHTML={{ __html: sizedBase }}
      />

      {/* Design area — user image clipped to printable region */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${dLeft}%`,
          top: `${dTop}%`,
          width: `${dWidth}%`,
          height: `${dHeight}%`,
          borderRadius: `${dRadiusX}% / ${dRadiusY}%`,
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {designURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={designURL}
            alt="Your design"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: imageFit === 'none' ? 'fill' : imageFit,
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        ) : (
          <button
            onClick={onUploadClick}
            className="w-full h-full flex flex-col items-center justify-center gap-1 bg-black/25 backdrop-blur-sm hover:bg-black/35 transition-colors cursor-pointer"
          >
            {uploading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-white text-[32px] opacity-90">add_photo_alternate</span>
                <p className="text-white text-[10px] font-semibold tracking-wide opacity-80">Upload design</p>
              </>
            )}
          </button>
        )}
      </div>

      {/* Overlay SVG — gloss and reflection on top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
        dangerouslySetInnerHTML={{ __html: sizedOverlay }}
      />

      {/* Flip hinge indicator */}
      {config.isFlip && (
        <div
          className="absolute left-[8%] right-[8%] pointer-events-none"
          style={{
            top: `${(130 / nativeH) * 100}%`,
            height: 8,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #1a1a1a, #333, #1a1a1a)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 4,
          }}
        />
      )}
    </div>
  );
}
