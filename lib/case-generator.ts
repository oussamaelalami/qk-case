/**
 * PHONE CASE SVG GENERATOR
 * Generates base and overlay SVG strings from PHONE_DB config.
 */

import type { PhoneModelConfig, CamConfig, LensConfig } from './phone-db';

export function adjustBrightness(hex: string, amount: number): string {
  try {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  } catch { return hex; }
}

function buildDefs(id: string, config: PhoneModelConfig): string {
  const { caseX, caseY, caseW, caseH, rx, design } = config;
  return `
  <defs>
    <clipPath id="caseClip_${id}">
      <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"/>
    </clipPath>
    <clipPath id="designClip_${id}">
      <rect x="${design.x}" y="${design.y}" width="${design.w}" height="${design.h}" rx="${design.r}" ry="${design.r}"/>
    </clipPath>
    <filter id="caseShadow_${id}" x="-8%" y="-4%" width="116%" height="112%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.45"/>
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <filter id="camShadow_${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <filter id="lensShadow_${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.7"/>
    </filter>
    <linearGradient id="glossGrad_${id}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.18"/>
      <stop offset="40%" stop-color="#fff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edgeLeft_${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edgeRight_${id}" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edgeTop_${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edgeBot_${id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#000" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <filter id="matte_${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
      <feComponentTransfer in="blended">
        <feFuncA type="linear" slope="1"/>
      </feComponentTransfer>
    </filter>
    <radialGradient id="lensGrad_${id}" cx="35%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#4a5568" stop-opacity="1"/>
      <stop offset="60%" stop-color="#1a202c" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0d1117" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="lensReflect_${id}" cx="30%" cy="28%" r="45%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="flashGrad_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fffde7" stop-opacity="1"/>
      <stop offset="70%" stop-color="#ffecb3" stop-opacity="1"/>
      <stop offset="100%" stop-color="#ffd54f" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="lidarGrad_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8b0000" stop-opacity="1"/>
      <stop offset="70%" stop-color="#4a0000" stop-opacity="1"/>
      <stop offset="100%" stop-color="#1a0000" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="soloRing_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2d3748"/>
      <stop offset="75%" stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </radialGradient>
    <radialGradient id="leicaRing_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3d2b1f"/>
      <stop offset="80%" stop-color="#1a0f0a"/>
      <stop offset="100%" stop-color="#0d0705"/>
    </radialGradient>
  </defs>`;
}

function renderLens(l: LensConfig, id: string, isLeica: boolean): string {
  const ringColor  = isLeica ? '#7a4a2a' : '#2d3748';
  const ringColor2 = isLeica ? '#4a2810' : '#0d1117';
  const outerR     = l.r + 4;
  const middleR    = l.r + 1.5;
  return `
    <circle cx="${l.cx}" cy="${l.cy}" r="${outerR}" fill="${ringColor2}"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${outerR - 1}" fill="none" stroke="${ringColor}" stroke-width="1.5"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${middleR}" fill="#111318"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#lensGrad_${id})" filter="url(#lensShadow_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#lensReflect_${id})"/>
    <circle cx="${l.cx - l.r * 0.28}" cy="${l.cy - l.r * 0.28}" r="${l.r * 0.18}" fill="#fff" opacity="0.22"/>`;
}

function renderSoloLens(l: LensConfig, id: string): string {
  const outerR = l.r + 8;
  const midR   = l.r + 4;
  return `
    <circle cx="${l.cx}" cy="${l.cy}" r="${outerR}" fill="#111318"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${outerR}" fill="none" stroke="#1e2329" stroke-width="2"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${midR}" fill="url(#soloRing_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${midR}" fill="none" stroke="#2d3748" stroke-width="1.5"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#lensGrad_${id})" filter="url(#lensShadow_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#lensReflect_${id})"/>
    <circle cx="${l.cx - l.r * 0.3}" cy="${l.cy - l.r * 0.3}" r="${l.r * 0.2}" fill="#fff" opacity="0.2"/>`;
}

function renderFlash(l: LensConfig, id: string): string {
  if (l.solo) {
    return `
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r + 3}" fill="#111318"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r + 1}" fill="#1a1f26"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#flashGrad_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r * 0.4}" fill="#fff" opacity="0.6"/>`;
  }
  return `
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r + 2}" fill="#0d0f12"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#flashGrad_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r * 0.4}" fill="#fff" opacity="0.5"/>`;
}

function renderLidar(l: LensConfig, id: string): string {
  return `
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r + 2}" fill="#0d0f12"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r}" fill="url(#lidarGrad_${id})"/>
    <circle cx="${l.cx}" cy="${l.cy}" r="${l.r * 0.5}" fill="#3d0000" opacity="0.6"/>`;
}

function renderCamera(config: PhoneModelConfig, id: string): string {
  const cam = config.cam;
  if (!cam) return '';
  const { bx, by, bw, bh, br } = cam;
  const isLeica = cam.type.startsWith('leica');
  const isSolo  = cam.type.startsWith('s-');
  let out = '';

  if (!isSolo) {
    const islandFill   = isLeica ? `url(#leicaRing_${id})` : '#1e2025';
    const islandStroke = isLeica ? '#5a3a28' : '#0a0b0d';
    const islandSW     = isLeica ? 3 : 2;
    out += `
    <g filter="url(#camShadow_${id})">
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${br ?? 0}" ry="${br ?? 0}"
        fill="${islandFill}" stroke="${islandStroke}" stroke-width="${islandSW}"/>
    </g>`;
    if (isLeica) {
      out += `
    <rect x="${bx + 3}" y="${by + 3}" width="${bw - 6}" height="${bh - 6}" rx="${(br ?? 0) - 2}" ry="${(br ?? 0) - 2}"
      fill="none" stroke="#3d2010" stroke-width="1.5" opacity="0.8"/>`;
    } else {
      out += `
    <rect x="${bx + 2}" y="${by + 2}" width="${bw - 4}" height="${bh - 4}" rx="${(br ?? 0) - 1}" ry="${(br ?? 0) - 1}"
      fill="none" stroke="#ffffff08" stroke-width="1"/>`;
    }
  }

  for (const l of cam.lenses) {
    if (l.flash)       out += renderFlash(l, id);
    else if (l.lidar)  out += renderLidar(l, id);
    else if (l.solo)   out += renderSoloLens(l, id);
    else               out += renderLens(l, id, isLeica);
  }

  if (!isSolo && bw > 0 && bh > 0) {
    out += `
    <rect x="${bx}" y="${by}" width="${bw}" height="${Math.min(bh, 32)}" rx="${br ?? 0}" ry="${br ?? 0}"
      fill="url(#glossGrad_${id})" opacity="0.5"/>`;
  }
  return out;
}

function renderButtons(config: PhoneModelConfig): string {
  const { caseX, caseY, caseW, caseH, rx } = config;
  const bRight = caseX + caseW;
  const pw = 4, ph = 56, pr = 2;
  const powerY = caseY + caseH * 0.28;
  const vol1Y  = caseY + caseH * 0.22;
  const vol2Y  = caseY + caseH * 0.30;
  const vph    = 44;
  return `
    <rect x="${bRight - 1}" y="${powerY}" width="${pw}" height="${ph}" rx="${pr}" ry="${pr}"
      fill="#d0d0d0" stroke="#b8b8b8" stroke-width="0.5"/>
    <rect x="${caseX - pw + 1}" y="${vol1Y}" width="${pw}" height="${vph}" rx="${pr}" ry="${pr}"
      fill="#d0d0d0" stroke="#b8b8b8" stroke-width="0.5"/>
    <rect x="${caseX - pw + 1}" y="${vol2Y + vph + 8}" width="${pw}" height="${vph}" rx="${pr}" ry="${pr}"
      fill="#d0d0d0" stroke="#b8b8b8" stroke-width="0.5"/>`;
}

export function generateBase(config: PhoneModelConfig, id: string): string {
  const { viewBox, caseX, caseY, caseW, caseH, rx, design } = config;
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
  ${buildDefs(id, config)}
  <g filter="url(#caseShadow_${id})">
    <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}" fill="#f0f0f0"/>
  </g>
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}"
    rx="${rx}" ry="${rx}" fill="#e8e8e8" filter="url(#matte_${id})" opacity="0.15"/>
  <rect x="${caseX}" y="${caseY}" width="18" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="url(#edgeLeft_${id})" clip-path="url(#caseClip_${id})"/>
  <rect x="${caseX + caseW - 18}" y="${caseY}" width="18" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="url(#edgeRight_${id})" clip-path="url(#caseClip_${id})"/>
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="20" rx="${rx}" ry="${rx}"
    fill="url(#edgeTop_${id})" clip-path="url(#caseClip_${id})"/>
  <rect x="${caseX}" y="${caseY + caseH - 20}" width="${caseW}" height="20" rx="${rx}" ry="${rx}"
    fill="url(#edgeBot_${id})" clip-path="url(#caseClip_${id})"/>
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}"
    rx="${rx}" ry="${rx}" fill="none" stroke="#c8c8c8" stroke-width="1.5"/>
  <rect x="${design.x - 1}" y="${design.y - 1}" width="${design.w + 2}" height="${design.h + 2}"
    rx="${design.r + 1}" ry="${design.r + 1}" fill="none" stroke="#d0d0d0" stroke-width="1"/>
  ${renderButtons(config)}
</svg>`;
}

export function generateOverlay(config: PhoneModelConfig, id: string): string {
  const { viewBox, caseX, caseY, caseW, caseH, rx } = config;
  const bevel = Math.round(caseW * 0.06);

  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" style="pointer-events:none">
  <defs>
    <clipPath id="ovClip_${id}">
      <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"/>
    </clipPath>

    <!-- Bevel gradients — light from top-left -->
    <linearGradient id="ovBevL_${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ovBevR_${id}" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ovBevT_${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="ovBevB_${id}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>

    <!-- Directional light wash -->
    <linearGradient id="ovLight_${id}" x1="0.05" y1="0.02" x2="0.90" y2="0.98">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.10"/>
      <stop offset="45%"  stop-color="#fff" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.08"/>
    </linearGradient>

    <!-- Specular gloss spot — upper left -->
    <radialGradient id="ovSpec_${id}" cx="25%" cy="20%" r="50%" gradientUnits="objectBoundingBox">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.22"/>
      <stop offset="50%"  stop-color="#fff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>

    <!-- Vignette — darken corners -->
    <radialGradient id="ovVig_${id}" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
      <stop offset="0%"   stop-color="#000" stop-opacity="0"/>
      <stop offset="65%"  stop-color="#000" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.20"/>
    </radialGradient>

    <!-- Rim stroke gradient — bright left/top, dark right/bottom -->
    <linearGradient id="ovRim_${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.50"/>
      <stop offset="45%"  stop-color="#fff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.20"/>
    </linearGradient>

    <!-- Camera filters & gradients -->
    <filter id="camShadow_${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <filter id="lensShadow_${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.7"/>
    </filter>
    <linearGradient id="glossGrad_${id}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.18"/>
      <stop offset="40%"  stop-color="#fff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="lensGrad_${id}" cx="35%" cy="35%" r="60%">
      <stop offset="0%"   stop-color="#4a5568"/>
      <stop offset="60%"  stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </radialGradient>
    <radialGradient id="lensReflect_${id}" cx="30%" cy="28%" r="45%">
      <stop offset="0%"   stop-color="#fff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="flashGrad_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#fffde7"/>
      <stop offset="70%"  stop-color="#ffecb3"/>
      <stop offset="100%" stop-color="#ffd54f"/>
    </radialGradient>
    <radialGradient id="lidarGrad_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#8b0000"/>
      <stop offset="70%"  stop-color="#4a0000"/>
      <stop offset="100%" stop-color="#1a0000"/>
    </radialGradient>
    <radialGradient id="soloRing_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#2d3748"/>
      <stop offset="75%"  stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </radialGradient>
    <radialGradient id="leicaRing_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#3d2b1f"/>
      <stop offset="80%"  stop-color="#1a0f0a"/>
      <stop offset="100%" stop-color="#0d0705"/>
    </radialGradient>
  </defs>

  <!-- Bevel left (bright) -->
  <rect x="${caseX}" y="${caseY}" width="${bevel}" height="${caseH}"
    fill="url(#ovBevL_${id})" clip-path="url(#ovClip_${id})"/>
  <!-- Bevel right (shadow) -->
  <rect x="${caseX + caseW - bevel}" y="${caseY}" width="${bevel}" height="${caseH}"
    fill="url(#ovBevR_${id})" clip-path="url(#ovClip_${id})"/>
  <!-- Bevel top (bright) -->
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${bevel}"
    fill="url(#ovBevT_${id})" clip-path="url(#ovClip_${id})"/>
  <!-- Bevel bottom (shadow) -->
  <rect x="${caseX}" y="${caseY + caseH - bevel}" width="${caseW}" height="${bevel}"
    fill="url(#ovBevB_${id})" clip-path="url(#ovClip_${id})"/>

  <!-- Directional light wash -->
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="url(#ovLight_${id})" clip-path="url(#ovClip_${id})"/>

  <!-- Specular gloss -->
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="url(#ovSpec_${id})" clip-path="url(#ovClip_${id})"/>

  <!-- Vignette -->
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="url(#ovVig_${id})" clip-path="url(#ovClip_${id})"/>

  <!-- Rim light outer stroke -->
  <rect x="${caseX}" y="${caseY}" width="${caseW}" height="${caseH}" rx="${rx}" ry="${rx}"
    fill="none" stroke="url(#ovRim_${id})" stroke-width="2.5"/>

  <!-- Inner inset line for depth -->
  <rect x="${caseX + 2}" y="${caseY + 2}" width="${caseW - 4}" height="${caseH - 4}" rx="${rx - 1}" ry="${rx - 1}"
    fill="none" stroke="#fff" stroke-width="1" stroke-opacity="0.10" clip-path="url(#ovClip_${id})"/>

  ${renderCamera(config, id)}
</svg>`;
}
