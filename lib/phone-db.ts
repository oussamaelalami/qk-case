/**
 * PHONE CASE DATABASE
 * All dimensions in SVG units within a variable viewBox.
 * design: the printable/clipping region.
 * cam: describes camera island geometry.
 */

export interface LensConfig {
  cx: number;
  cy: number;
  r: number;
  flash?: boolean;
  lidar?: boolean;
  solo?: boolean;
}

export interface CamConfig {
  type: string;
  bx: number;
  by: number;
  bw: number;
  bh: number;
  br?: number;
  lenses: LensConfig[];
}

export interface DesignArea {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

export interface PhoneModelConfig {
  label: string;
  viewBox: string;
  caseW: number;
  caseH: number;
  caseX: number;
  caseY: number;
  rx: number;
  design: DesignArea;
  cam: CamConfig;
  isFlip?: boolean;
  isFold?: boolean;
}

export interface BrandConfig {
  label: string;
  models: Record<string, PhoneModelConfig>;
}

export const PHONE_DB: Record<string, BrandConfig> = {
  apple: {
    label: 'Apple',
    models: {
      'iphone-11': {
        label: 'iPhone 11', viewBox: '0 0 400 860',
        caseW: 380, caseH: 840, caseX: 10, caseY: 10, rx: 54,
        design: { x: 30, y: 90, w: 340, h: 680, r: 36 },
        cam: { type: 'dual-sq', bx: 34, by: 26, bw: 110, bh: 110, br: 28,
          lenses: [{ cx: 66, cy: 58, r: 22 }, { cx: 110, cy: 88, r: 22 }, { cx: 112, cy: 56, r: 9, flash: true }] },
      },
      'iphone-11-pro': {
        label: 'iPhone 11 Pro', viewBox: '0 0 400 860',
        caseW: 376, caseH: 836, caseX: 12, caseY: 12, rx: 54,
        design: { x: 30, y: 90, w: 340, h: 678, r: 36 },
        cam: { type: 'triple-sq', bx: 28, by: 22, bw: 128, bh: 128, br: 30,
          lenses: [{ cx: 62, cy: 56, r: 20 }, { cx: 106, cy: 56, r: 20 }, { cx: 84, cy: 100, r: 20 }, { cx: 118, cy: 96, r: 8, flash: true }] },
      },
      'iphone-11-pro-max': {
        label: 'iPhone 11 Pro Max', viewBox: '0 0 400 880',
        caseW: 378, caseH: 858, caseX: 11, caseY: 11, rx: 56,
        design: { x: 30, y: 92, w: 340, h: 696, r: 38 },
        cam: { type: 'triple-sq', bx: 28, by: 22, bw: 130, bh: 130, br: 32,
          lenses: [{ cx: 62, cy: 56, r: 20 }, { cx: 108, cy: 56, r: 20 }, { cx: 85, cy: 102, r: 20 }, { cx: 120, cy: 98, r: 8, flash: true }] },
      },
      'iphone-12': {
        label: 'iPhone 12', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 88, w: 340, h: 682, r: 34 },
        cam: { type: 'dual-sq', bx: 26, by: 22, bw: 108, bh: 108, br: 26,
          lenses: [{ cx: 58, cy: 52, r: 22 }, { cx: 102, cy: 96, r: 22 }, { cx: 104, cy: 50, r: 8, flash: true }] },
      },
      'iphone-12-mini': {
        label: 'iPhone 12 Mini', viewBox: '0 0 390 840',
        caseW: 368, caseH: 818, caseX: 11, caseY: 11, rx: 50,
        design: { x: 29, y: 86, w: 330, h: 660, r: 32 },
        cam: { type: 'dual-sq', bx: 24, by: 20, bw: 104, bh: 104, br: 24,
          lenses: [{ cx: 56, cy: 50, r: 20 }, { cx: 98, cy: 92, r: 20 }, { cx: 100, cy: 48, r: 7, flash: true }] },
      },
      'iphone-12-pro': {
        label: 'iPhone 12 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 90, w: 340, h: 678, r: 34 },
        cam: { type: 'triple-sq', bx: 26, by: 22, bw: 126, bh: 126, br: 28,
          lenses: [{ cx: 60, cy: 54, r: 20 }, { cx: 104, cy: 54, r: 20 }, { cx: 82, cy: 98, r: 20 }, { cx: 116, cy: 94, r: 8, flash: true }] },
      },
      'iphone-12-pro-max': {
        label: 'iPhone 12 Pro Max', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 92, w: 344, h: 696, r: 36 },
        cam: { type: 'triple-sq', bx: 24, by: 20, bw: 132, bh: 132, br: 30,
          lenses: [{ cx: 58, cy: 54, r: 22 }, { cx: 106, cy: 54, r: 22 }, { cx: 82, cy: 102, r: 22 }, { cx: 118, cy: 98, r: 9, flash: true }] },
      },
      'iphone-13': {
        label: 'iPhone 13', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 88, w: 340, h: 682, r: 34 },
        cam: { type: 'dual-diag', bx: 26, by: 22, bw: 116, bh: 116, br: 30,
          lenses: [{ cx: 58, cy: 90, r: 22 }, { cx: 100, cy: 58, r: 22 }, { cx: 106, cy: 96, r: 8, flash: true }] },
      },
      'iphone-13-mini': {
        label: 'iPhone 13 Mini', viewBox: '0 0 390 840',
        caseW: 368, caseH: 818, caseX: 11, caseY: 11, rx: 50,
        design: { x: 29, y: 86, w: 330, h: 660, r: 32 },
        cam: { type: 'dual-diag', bx: 24, by: 20, bw: 110, bh: 110, br: 28,
          lenses: [{ cx: 54, cy: 86, r: 20 }, { cx: 96, cy: 54, r: 20 }, { cx: 102, cy: 92, r: 7, flash: true }] },
      },
      'iphone-13-pro': {
        label: 'iPhone 13 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 90, w: 340, h: 678, r: 34 },
        cam: { type: 'triple-pro', bx: 22, by: 18, bw: 140, bh: 140, br: 34,
          lenses: [{ cx: 56, cy: 56, r: 22 }, { cx: 108, cy: 56, r: 22 }, { cx: 82, cy: 108, r: 22 },
            { cx: 118, cy: 104, r: 9, flash: true }, { cx: 120, cy: 64, r: 10, lidar: true }] },
      },
      'iphone-13-pro-max': {
        label: 'iPhone 13 Pro Max', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 92, w: 344, h: 696, r: 36 },
        cam: { type: 'triple-pro', bx: 20, by: 18, bw: 144, bh: 144, br: 36,
          lenses: [{ cx: 56, cy: 56, r: 24 }, { cx: 112, cy: 56, r: 24 }, { cx: 84, cy: 112, r: 24 },
            { cx: 120, cy: 108, r: 10, flash: true }, { cx: 122, cy: 66, r: 11, lidar: true }] },
      },
      'iphone-14': {
        label: 'iPhone 14', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 88, w: 340, h: 682, r: 34 },
        cam: { type: 'dual-diag', bx: 24, by: 20, bw: 120, bh: 120, br: 32,
          lenses: [{ cx: 56, cy: 94, r: 24 }, { cx: 102, cy: 56, r: 24 }, { cx: 108, cy: 100, r: 9, flash: true }] },
      },
      'iphone-14-plus': {
        label: 'iPhone 14 Plus', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 90, w: 344, h: 698, r: 36 },
        cam: { type: 'dual-diag', bx: 22, by: 20, bw: 122, bh: 122, br: 32,
          lenses: [{ cx: 56, cy: 96, r: 24 }, { cx: 104, cy: 56, r: 24 }, { cx: 110, cy: 102, r: 9, flash: true }] },
      },
      'iphone-14-pro': {
        label: 'iPhone 14 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 92, w: 340, h: 676, r: 34 },
        cam: { type: 'triple-pro-lg', bx: 20, by: 16, bw: 148, bh: 148, br: 38,
          lenses: [{ cx: 56, cy: 56, r: 24 }, { cx: 112, cy: 56, r: 24 }, { cx: 84, cy: 112, r: 24 },
            { cx: 122, cy: 108, r: 10, flash: true }, { cx: 124, cy: 68, r: 11, lidar: true }] },
      },
      'iphone-14-pro-max': {
        label: 'iPhone 14 Pro Max', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 94, w: 344, h: 694, r: 36 },
        cam: { type: 'triple-pro-lg', bx: 18, by: 14, bw: 154, bh: 154, br: 40,
          lenses: [{ cx: 56, cy: 56, r: 26 }, { cx: 116, cy: 56, r: 26 }, { cx: 86, cy: 116, r: 26 },
            { cx: 126, cy: 112, r: 11, flash: true }, { cx: 128, cy: 70, r: 12, lidar: true }] },
      },
      'iphone-15': {
        label: 'iPhone 15', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 54,
        design: { x: 30, y: 88, w: 340, h: 682, r: 36 },
        cam: { type: 'dual-diag', bx: 24, by: 20, bw: 122, bh: 122, br: 32,
          lenses: [{ cx: 56, cy: 96, r: 24 }, { cx: 104, cy: 56, r: 24 }, { cx: 110, cy: 102, r: 9, flash: true }] },
      },
      'iphone-15-plus': {
        label: 'iPhone 15 Plus', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 90, w: 344, h: 698, r: 36 },
        cam: { type: 'dual-diag', bx: 22, by: 18, bw: 124, bh: 124, br: 32,
          lenses: [{ cx: 56, cy: 98, r: 24 }, { cx: 106, cy: 56, r: 24 }, { cx: 112, cy: 104, r: 9, flash: true }] },
      },
      'iphone-15-pro': {
        label: 'iPhone 15 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 54,
        design: { x: 30, y: 92, w: 340, h: 676, r: 36 },
        cam: { type: 'triple-pro-lg', bx: 18, by: 14, bw: 152, bh: 152, br: 40,
          lenses: [{ cx: 54, cy: 54, r: 24 }, { cx: 112, cy: 54, r: 24 }, { cx: 83, cy: 112, r: 24 },
            { cx: 122, cy: 108, r: 10, flash: true }, { cx: 124, cy: 66, r: 11, lidar: true }] },
      },
      'iphone-15-pro-max': {
        label: 'iPhone 15 Pro Max', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 94, w: 344, h: 694, r: 38 },
        cam: { type: 'triple-pro-lg', bx: 16, by: 12, bw: 158, bh: 158, br: 42,
          lenses: [{ cx: 54, cy: 54, r: 26 }, { cx: 116, cy: 54, r: 26 }, { cx: 85, cy: 116, r: 26 },
            { cx: 126, cy: 112, r: 11, flash: true }, { cx: 128, cy: 68, r: 12, lidar: true }] },
      },
      'iphone-16': {
        label: 'iPhone 16', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 54,
        design: { x: 30, y: 88, w: 340, h: 682, r: 36 },
        cam: { type: 'dual-vert', bx: 30, by: 20, bw: 100, bh: 120, br: 30,
          lenses: [{ cx: 80, cy: 50, r: 22 }, { cx: 80, cy: 96, r: 22 }, { cx: 48, cy: 73, r: 9, flash: true }] },
      },
      'iphone-16-plus': {
        label: 'iPhone 16 Plus', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 90, w: 344, h: 698, r: 36 },
        cam: { type: 'dual-vert', bx: 28, by: 18, bw: 102, bh: 122, br: 30,
          lenses: [{ cx: 80, cy: 50, r: 22 }, { cx: 80, cy: 98, r: 22 }, { cx: 46, cy: 74, r: 9, flash: true }] },
      },
      'iphone-16-pro': {
        label: 'iPhone 16 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 54,
        design: { x: 30, y: 92, w: 340, h: 676, r: 36 },
        cam: { type: 'triple-pro-xl', bx: 16, by: 12, bw: 158, bh: 158, br: 42,
          lenses: [{ cx: 54, cy: 54, r: 26 }, { cx: 116, cy: 54, r: 26 }, { cx: 85, cy: 116, r: 26 },
            { cx: 126, cy: 112, r: 11, flash: true }, { cx: 128, cy: 68, r: 12, lidar: true }] },
      },
      'iphone-16-pro-max': {
        label: 'iPhone 16 Pro Max', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 94, w: 344, h: 694, r: 38 },
        cam: { type: 'triple-pro-xl', bx: 14, by: 10, bw: 164, bh: 164, br: 44,
          lenses: [{ cx: 54, cy: 54, r: 28 }, { cx: 120, cy: 54, r: 28 }, { cx: 87, cy: 120, r: 28 },
            { cx: 130, cy: 116, r: 12, flash: true }, { cx: 132, cy: 70, r: 13, lidar: true }] },
      },
    },
  },

  samsung: {
    label: 'Samsung',
    models: {
      'galaxy-a05': {
        label: 'Galaxy A05', viewBox: '0 0 390 860',
        caseW: 368, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 28, y: 80, w: 332, h: 688, r: 28 },
        cam: { type: 'dual-flat', bx: 20, by: 20, bw: 90, bh: 56, br: 16,
          lenses: [{ cx: 50, cy: 48, r: 20 }, { cx: 94, cy: 48, r: 14 }, { cx: 94, cy: 30, r: 7, flash: true }] },
      },
      'galaxy-a06': {
        label: 'Galaxy A06', viewBox: '0 0 390 860',
        caseW: 368, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 28, y: 80, w: 332, h: 688, r: 28 },
        cam: { type: 'dual-flat', bx: 20, by: 20, bw: 92, bh: 58, br: 16,
          lenses: [{ cx: 50, cy: 50, r: 20 }, { cx: 96, cy: 50, r: 14 }, { cx: 96, cy: 30, r: 7, flash: true }] },
      },
      'galaxy-a15': {
        label: 'Galaxy A15', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'triple-flat', bx: 20, by: 20, bw: 120, bh: 60, br: 18,
          lenses: [{ cx: 50, cy: 50, r: 20 }, { cx: 94, cy: 50, r: 16 }, { cx: 130, cy: 50, r: 12 }, { cx: 130, cy: 30, r: 7, flash: true }] },
      },
      'galaxy-a16': {
        label: 'Galaxy A16', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'triple-flat', bx: 20, by: 20, bw: 122, bh: 62, br: 18,
          lenses: [{ cx: 50, cy: 51, r: 20 }, { cx: 95, cy: 51, r: 16 }, { cx: 132, cy: 51, r: 12 }, { cx: 132, cy: 30, r: 7, flash: true }] },
      },
      'galaxy-a25': {
        label: 'Galaxy A25', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'triple-pill', bx: 22, by: 18, bw: 78, bh: 130, br: 22,
          lenses: [{ cx: 61, cy: 46, r: 22 }, { cx: 61, cy: 92, r: 18 }, { cx: 61, cy: 130, r: 14 }, { cx: 40, cy: 48, r: 8, flash: true }] },
      },
      'galaxy-a35': {
        label: 'Galaxy A35', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 684, r: 32 },
        cam: { type: 'triple-pill', bx: 20, by: 18, bw: 80, bh: 136, br: 24,
          lenses: [{ cx: 62, cy: 48, r: 24 }, { cx: 62, cy: 96, r: 18 }, { cx: 62, cy: 136, r: 14 }, { cx: 38, cy: 48, r: 8, flash: true }] },
      },
      'galaxy-a36': {
        label: 'Galaxy A36', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 684, r: 32 },
        cam: { type: 'triple-pill', bx: 20, by: 18, bw: 82, bh: 138, br: 24,
          lenses: [{ cx: 63, cy: 48, r: 24 }, { cx: 63, cy: 98, r: 18 }, { cx: 63, cy: 138, r: 14 }, { cx: 38, cy: 50, r: 8, flash: true }] },
      },
      'galaxy-a55': {
        label: 'Galaxy A55', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 140, br: 26,
          lenses: [{ cx: 62, cy: 48, r: 25 }, { cx: 62, cy: 100, r: 20 }, { cx: 62, cy: 142, r: 15 }, { cx: 36, cy: 50, r: 9, flash: true }] },
      },
      'galaxy-a56': {
        label: 'Galaxy A56', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 86, bh: 142, br: 26,
          lenses: [{ cx: 63, cy: 48, r: 25 }, { cx: 63, cy: 102, r: 20 }, { cx: 63, cy: 144, r: 15 }, { cx: 36, cy: 50, r: 9, flash: true }] },
      },
      'galaxy-s23': {
        label: 'Galaxy S23', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 682, r: 34 },
        cam: { type: 's-triple', bx: 26, by: 22, bw: 100, bh: 150,
          lenses: [{ cx: 68, cy: 44, r: 24, solo: true }, { cx: 68, cy: 95, r: 24, solo: true }, { cx: 68, cy: 148, r: 20, solo: true }, { cx: 44, cy: 44, r: 9, flash: true, solo: true }] },
      },
      'galaxy-s23-ultra': {
        label: 'Galaxy S23 Ultra', viewBox: '0 0 400 890',
        caseW: 380, caseH: 868, caseX: 10, caseY: 11, rx: 48,
        design: { x: 28, y: 88, w: 344, h: 712, r: 32 },
        cam: { type: 's-quad', bx: 20, by: 18, bw: 110, bh: 200,
          lenses: [{ cx: 66, cy: 38, r: 26, solo: true }, { cx: 66, cy: 98, r: 26, solo: true },
            { cx: 66, cy: 156, r: 22, solo: true }, { cx: 66, cy: 210, r: 18, solo: true }, { cx: 40, cy: 38, r: 10, flash: true, solo: true }] },
      },
      'galaxy-s24': {
        label: 'Galaxy S24', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 682, r: 34 },
        cam: { type: 's-triple', bx: 26, by: 22, bw: 100, bh: 150,
          lenses: [{ cx: 68, cy: 44, r: 24, solo: true }, { cx: 68, cy: 95, r: 24, solo: true }, { cx: 68, cy: 148, r: 20, solo: true }, { cx: 44, cy: 44, r: 9, flash: true, solo: true }] },
      },
      'galaxy-s24-plus': {
        label: 'Galaxy S24+', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 52,
        design: { x: 28, y: 88, w: 344, h: 700, r: 36 },
        cam: { type: 's-triple', bx: 24, by: 20, bw: 104, bh: 158,
          lenses: [{ cx: 70, cy: 46, r: 26, solo: true }, { cx: 70, cy: 100, r: 26, solo: true }, { cx: 70, cy: 156, r: 22, solo: true }, { cx: 44, cy: 46, r: 10, flash: true, solo: true }] },
      },
      'galaxy-s24-ultra': {
        label: 'Galaxy S24 Ultra', viewBox: '0 0 400 890',
        caseW: 380, caseH: 868, caseX: 10, caseY: 11, rx: 48,
        design: { x: 28, y: 88, w: 344, h: 712, r: 32 },
        cam: { type: 's-quad', bx: 18, by: 16, bw: 112, bh: 210,
          lenses: [{ cx: 66, cy: 36, r: 28, solo: true }, { cx: 66, cy: 100, r: 28, solo: true },
            { cx: 66, cy: 162, r: 22, solo: true }, { cx: 66, cy: 218, r: 18, solo: true }, { cx: 38, cy: 36, r: 10, flash: true, solo: true }] },
      },
      'galaxy-s25': {
        label: 'Galaxy S25', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 682, r: 34 },
        cam: { type: 's-triple', bx: 26, by: 22, bw: 100, bh: 152,
          lenses: [{ cx: 68, cy: 44, r: 25, solo: true }, { cx: 68, cy: 97, r: 25, solo: true }, { cx: 68, cy: 150, r: 20, solo: true }, { cx: 43, cy: 44, r: 9, flash: true, solo: true }] },
      },
      'galaxy-s25-plus': {
        label: 'Galaxy S25+', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 52,
        design: { x: 28, y: 88, w: 344, h: 700, r: 36 },
        cam: { type: 's-triple', bx: 24, by: 20, bw: 106, bh: 160,
          lenses: [{ cx: 70, cy: 46, r: 27, solo: true }, { cx: 70, cy: 102, r: 27, solo: true }, { cx: 70, cy: 158, r: 22, solo: true }, { cx: 43, cy: 46, r: 10, flash: true, solo: true }] },
      },
      'galaxy-s25-ultra': {
        label: 'Galaxy S25 Ultra', viewBox: '0 0 400 890',
        caseW: 380, caseH: 868, caseX: 10, caseY: 11, rx: 48,
        design: { x: 28, y: 88, w: 344, h: 712, r: 32 },
        cam: { type: 's-quad', bx: 18, by: 16, bw: 114, bh: 215,
          lenses: [{ cx: 66, cy: 36, r: 30, solo: true }, { cx: 66, cy: 104, r: 30, solo: true },
            { cx: 66, cy: 168, r: 22, solo: true }, { cx: 66, cy: 224, r: 18, solo: true }, { cx: 36, cy: 36, r: 10, flash: true, solo: true }] },
      },
      'galaxy-z-flip-6': {
        label: 'Galaxy Z Flip 6', viewBox: '0 0 400 480',
        caseW: 378, caseH: 458, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 100, w: 340, h: 330, r: 32 },
        cam: { type: 'flip-dual', bx: 26, by: 20, bw: 130, bh: 60, br: 22,
          lenses: [{ cx: 58, cy: 50, r: 22 }, { cx: 112, cy: 50, r: 22 }, { cx: 148, cy: 50, r: 9, flash: true }] },
        isFlip: true,
      },
      'galaxy-z-fold-6': {
        label: 'Galaxy Z Fold 6', viewBox: '0 0 340 900',
        caseW: 318, caseH: 878, caseX: 11, caseY: 11, rx: 48,
        design: { x: 26, y: 86, w: 288, h: 724, r: 32 },
        cam: { type: 'triple-pill', bx: 18, by: 18, bw: 78, bh: 130, br: 22,
          lenses: [{ cx: 59, cy: 44, r: 22 }, { cx: 59, cy: 90, r: 18 }, { cx: 59, cy: 128, r: 14 }, { cx: 36, cy: 44, r: 8, flash: true }] },
        isFold: true,
      },
    },
  },

  xiaomi: {
    label: 'Xiaomi',
    models: {
      'redmi-13': {
        label: 'Redmi 13', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'dual-circ', bx: 20, by: 18, bw: 90, bh: 90, br: 45,
          lenses: [{ cx: 55, cy: 50, r: 22 }, { cx: 85, cy: 75, r: 16 }, { cx: 52, cy: 80, r: 8, flash: true }] },
      },
      'redmi-note-13': {
        label: 'Redmi Note 13', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'triple-pill', bx: 20, by: 18, bw: 80, bh: 130, br: 22,
          lenses: [{ cx: 62, cy: 46, r: 24 }, { cx: 62, cy: 94, r: 18 }, { cx: 62, cy: 132, r: 13 }, { cx: 38, cy: 46, r: 8, flash: true }] },
      },
      'redmi-note-14': {
        label: 'Redmi Note 14', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 692, r: 32 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'redmi-note-14-pro': {
        label: 'Redmi Note 14 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 692, r: 32 },
        cam: { type: 'triple-pill-lg', bx: 16, by: 14, bw: 88, bh: 144, br: 26,
          lenses: [{ cx: 65, cy: 50, r: 28 }, { cx: 65, cy: 104, r: 22 }, { cx: 65, cy: 146, r: 15 }, { cx: 36, cy: 50, r: 10, flash: true }] },
      },
      'xiaomi-14': {
        label: 'Xiaomi 14', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 682, r: 36 },
        cam: { type: 'leica-sq', bx: 20, by: 18, bw: 140, bh: 140, br: 36,
          lenses: [{ cx: 54, cy: 54, r: 24 }, { cx: 108, cy: 54, r: 24 }, { cx: 81, cy: 108, r: 24 }, { cx: 118, cy: 104, r: 10, flash: true }] },
      },
      'xiaomi-14-ultra': {
        label: 'Xiaomi 14 Ultra', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 88, w: 340, h: 688, r: 36 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 148, bh: 148, br: 74,
          lenses: [{ cx: 55, cy: 55, r: 26 }, { cx: 111, cy: 55, r: 26 }, { cx: 55, cy: 111, r: 26 }, { cx: 111, cy: 111, r: 26 }, { cx: 84, cy: 84, r: 12, flash: true }] },
      },
      'xiaomi-15': {
        label: 'Xiaomi 15', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 682, r: 36 },
        cam: { type: 'leica-sq', bx: 18, by: 16, bw: 144, bh: 144, br: 38,
          lenses: [{ cx: 54, cy: 54, r: 26 }, { cx: 110, cy: 54, r: 26 }, { cx: 82, cy: 110, r: 26 }, { cx: 120, cy: 106, r: 11, flash: true }] },
      },
      'xiaomi-15-ultra': {
        label: 'Xiaomi 15 Ultra', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 88, w: 340, h: 688, r: 36 },
        cam: { type: 'leica-circ', bx: 16, by: 12, bw: 154, bh: 154, br: 77,
          lenses: [{ cx: 56, cy: 56, r: 28 }, { cx: 114, cy: 56, r: 28 }, { cx: 56, cy: 114, r: 28 }, { cx: 114, cy: 114, r: 28 }, { cx: 85, cy: 85, r: 13, flash: true }] },
      },
      'poco-x6-pro': {
        label: 'POCO X6 Pro', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 27 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'poco-f6-pro': {
        label: 'POCO F6 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 692, r: 32 },
        cam: { type: 'leica-sq', bx: 20, by: 18, bw: 136, bh: 136, br: 34,
          lenses: [{ cx: 52, cy: 52, r: 24 }, { cx: 104, cy: 52, r: 24 }, { cx: 78, cy: 104, r: 24 }, { cx: 114, cy: 100, r: 10, flash: true }] },
      },
    },
  },

  infinix: {
    label: 'Infinix',
    models: {
      'smart-8': {
        label: 'Smart 8', viewBox: '0 0 390 860',
        caseW: 368, caseH: 838, caseX: 11, caseY: 11, rx: 42,
        design: { x: 28, y: 78, w: 332, h: 692, r: 26 },
        cam: { type: 'dual-flat', bx: 18, by: 18, bw: 86, bh: 54, br: 14,
          lenses: [{ cx: 48, cy: 45, r: 19 }, { cx: 90, cy: 45, r: 13 }, { cx: 90, cy: 28, r: 6, flash: true }] },
      },
      'hot-40': {
        label: 'Hot 40', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'triple-flat', bx: 20, by: 18, bw: 118, bh: 58, br: 16,
          lenses: [{ cx: 48, cy: 49, r: 19 }, { cx: 90, cy: 49, r: 15 }, { cx: 126, cy: 49, r: 11 }, { cx: 126, cy: 28, r: 6, flash: true }] },
      },
      'hot-50': {
        label: 'Hot 50', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'triple-flat', bx: 20, by: 18, bw: 120, bh: 60, br: 16,
          lenses: [{ cx: 50, cy: 50, r: 20 }, { cx: 92, cy: 50, r: 15 }, { cx: 128, cy: 50, r: 11 }, { cx: 128, cy: 28, r: 6, flash: true }] },
      },
      'note-40': {
        label: 'Note 40', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 694, r: 30 },
        cam: { type: 'triple-pill', bx: 20, by: 18, bw: 80, bh: 128, br: 22,
          lenses: [{ cx: 62, cy: 46, r: 22 }, { cx: 62, cy: 90, r: 16 }, { cx: 62, cy: 128, r: 12 }, { cx: 38, cy: 46, r: 7, flash: true }] },
      },
      'zero-30': {
        label: 'Zero 30', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 692, r: 32 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 136, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 98, r: 20 }, { cx: 64, cy: 138, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
    },
  },

  tecno: {
    label: 'Tecno',
    models: {
      'spark-20': {
        label: 'Spark 20', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'triple-flat', bx: 20, by: 18, bw: 116, bh: 58, br: 16,
          lenses: [{ cx: 46, cy: 49, r: 19 }, { cx: 88, cy: 49, r: 14 }, { cx: 122, cy: 49, r: 10 }, { cx: 122, cy: 27, r: 6, flash: true }] },
      },
      'spark-go': {
        label: 'Spark Go', viewBox: '0 0 390 860',
        caseW: 368, caseH: 838, caseX: 11, caseY: 11, rx: 42,
        design: { x: 28, y: 78, w: 332, h: 692, r: 26 },
        cam: { type: 'dual-flat', bx: 18, by: 16, bw: 84, bh: 52, br: 14,
          lenses: [{ cx: 46, cy: 44, r: 18 }, { cx: 88, cy: 44, r: 12 }, { cx: 88, cy: 27, r: 6, flash: true }] },
      },
      'camon-30': {
        label: 'Camon 30', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 48,
        design: { x: 30, y: 84, w: 340, h: 692, r: 32 },
        cam: { type: 'triple-pill', bx: 20, by: 16, bw: 82, bh: 132, br: 24,
          lenses: [{ cx: 63, cy: 46, r: 24 }, { cx: 63, cy: 94, r: 18 }, { cx: 63, cy: 134, r: 13 }, { cx: 38, cy: 46, r: 8, flash: true }] },
      },
      'pova-6': {
        label: 'Pova 6', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 694, r: 30 },
        cam: { type: 'triple-pill', bx: 20, by: 18, bw: 80, bh: 130, br: 22,
          lenses: [{ cx: 62, cy: 46, r: 23 }, { cx: 62, cy: 92, r: 17 }, { cx: 62, cy: 130, r: 12 }, { cx: 38, cy: 46, r: 8, flash: true }] },
      },
    },
  },

  oppo: {
    label: 'OPPO',
    models: {
      'a60': {
        label: 'OPPO A60', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'dual-flat', bx: 20, by: 18, bw: 98, bh: 58, br: 16,
          lenses: [{ cx: 50, cy: 49, r: 22 }, { cx: 98, cy: 49, r: 14 }, { cx: 98, cy: 28, r: 7, flash: true }] },
      },
      'reno-12': {
        label: 'OPPO Reno 12', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 136, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 138, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'reno-14': {
        label: 'OPPO Reno 14', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 16, by: 14, bw: 86, bh: 140, br: 26,
          lenses: [{ cx: 65, cy: 48, r: 28 }, { cx: 65, cy: 102, r: 22 }, { cx: 65, cy: 142, r: 15 }, { cx: 36, cy: 48, r: 10, flash: true }] },
      },
      'find-x8': {
        label: 'OPPO Find X8', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 144, bh: 144, br: 72,
          lenses: [{ cx: 54, cy: 54, r: 26 }, { cx: 108, cy: 54, r: 26 }, { cx: 54, cy: 108, r: 26 }, { cx: 108, cy: 108, r: 26 }, { cx: 81, cy: 81, r: 12, flash: true }] },
      },
    },
  },

  realme: {
    label: 'realme',
    models: {
      'c55': {
        label: 'realme C55', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 46,
        design: { x: 30, y: 82, w: 340, h: 686, r: 30 },
        cam: { type: 'dual-flat', bx: 20, by: 18, bw: 96, bh: 56, br: 16,
          lenses: [{ cx: 50, cy: 47, r: 21 }, { cx: 96, cy: 47, r: 14 }, { cx: 96, cy: 27, r: 7, flash: true }] },
      },
      '12-pro': {
        label: 'realme 12 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 27 }, { cx: 64, cy: 100, r: 21 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'gt-neo-6': {
        label: 'realme GT Neo 6', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 16, by: 14, bw: 86, bh: 140, br: 24,
          lenses: [{ cx: 65, cy: 48, r: 27 }, { cx: 65, cy: 102, r: 21 }, { cx: 65, cy: 142, r: 15 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
    },
  },

  honor: {
    label: 'HONOR',
    models: {
      'x7': {
        label: 'HONOR X7', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'triple-flat', bx: 20, by: 18, bw: 116, bh: 56, br: 16,
          lenses: [{ cx: 46, cy: 46, r: 19 }, { cx: 88, cy: 46, r: 14 }, { cx: 122, cy: 46, r: 10 }, { cx: 122, cy: 27, r: 6, flash: true }] },
      },
      'honor-200': {
        label: 'HONOR 200', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 84, w: 340, h: 692, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'magic-7-pro': {
        label: 'HONOR Magic 7 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 146, bh: 146, br: 73,
          lenses: [{ cx: 55, cy: 55, r: 26 }, { cx: 109, cy: 55, r: 26 }, { cx: 55, cy: 109, r: 26 }, { cx: 109, cy: 109, r: 26 }, { cx: 82, cy: 82, r: 12, flash: true }] },
      },
    },
  },

  oneplus: {
    label: 'OnePlus',
    models: {
      'nord-4': {
        label: 'OnePlus Nord 4', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 84, w: 340, h: 692, r: 34 },
        cam: { type: 'dual-flat', bx: 20, by: 18, bw: 100, bh: 58, br: 16,
          lenses: [{ cx: 52, cy: 49, r: 23 }, { cx: 100, cy: 49, r: 15 }, { cx: 100, cy: 27, r: 8, flash: true }] },
      },
      'oneplus-12': {
        label: 'OnePlus 12', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 148, bh: 148, br: 74,
          lenses: [{ cx: 56, cy: 56, r: 28 }, { cx: 110, cy: 56, r: 28 }, { cx: 56, cy: 110, r: 28 }, { cx: 110, cy: 110, r: 28 }, { cx: 83, cy: 83, r: 12, flash: true }] },
      },
      'oneplus-13': {
        label: 'OnePlus 13', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'leica-circ', bx: 16, by: 12, bw: 154, bh: 154, br: 77,
          lenses: [{ cx: 58, cy: 58, r: 30 }, { cx: 114, cy: 58, r: 30 }, { cx: 58, cy: 114, r: 30 }, { cx: 114, cy: 114, r: 30 }, { cx: 86, cy: 86, r: 13, flash: true }] },
      },
    },
  },

  vivo: {
    label: 'vivo',
    models: {
      'y28': {
        label: 'vivo Y28', viewBox: '0 0 400 860',
        caseW: 378, caseH: 838, caseX: 11, caseY: 11, rx: 44,
        design: { x: 30, y: 80, w: 340, h: 688, r: 28 },
        cam: { type: 'dual-flat', bx: 20, by: 18, bw: 94, bh: 56, br: 16,
          lenses: [{ cx: 50, cy: 46, r: 21 }, { cx: 94, cy: 46, r: 14 }, { cx: 94, cy: 26, r: 7, flash: true }] },
      },
      'v40': {
        label: 'vivo V40', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'x100-pro': {
        label: 'vivo X100 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 148, bh: 148, br: 74,
          lenses: [{ cx: 56, cy: 56, r: 28 }, { cx: 110, cy: 56, r: 28 }, { cx: 56, cy: 110, r: 28 }, { cx: 110, cy: 110, r: 28 }, { cx: 83, cy: 83, r: 12, flash: true }] },
      },
      'x200-ultra': {
        label: 'vivo X200 Ultra', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 52,
        design: { x: 28, y: 88, w: 344, h: 700, r: 36 },
        cam: { type: 'leica-circ', bx: 16, by: 12, bw: 154, bh: 154, br: 77,
          lenses: [{ cx: 58, cy: 58, r: 30 }, { cx: 114, cy: 58, r: 30 }, { cx: 58, cy: 114, r: 30 }, { cx: 114, cy: 114, r: 30 }, { cx: 86, cy: 86, r: 13, flash: true }] },
      },
    },
  },

  huawei: {
    label: 'Huawei',
    models: {
      'nova-12': {
        label: 'Huawei Nova 12', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 50,
        design: { x: 30, y: 86, w: 340, h: 690, r: 34 },
        cam: { type: 'triple-pill', bx: 18, by: 16, bw: 84, bh: 138, br: 24,
          lenses: [{ cx: 64, cy: 48, r: 26 }, { cx: 64, cy: 100, r: 20 }, { cx: 64, cy: 140, r: 14 }, { cx: 38, cy: 48, r: 9, flash: true }] },
      },
      'p60-pro': {
        label: 'Huawei P60 Pro', viewBox: '0 0 400 870',
        caseW: 378, caseH: 848, caseX: 11, caseY: 11, rx: 52,
        design: { x: 30, y: 86, w: 340, h: 690, r: 36 },
        cam: { type: 'triple-oval', bx: 20, by: 14, bw: 120, bh: 150, br: 42,
          lenses: [{ cx: 80, cy: 48, r: 28 }, { cx: 80, cy: 102, r: 22 }, { cx: 80, cy: 148, r: 16 }, { cx: 48, cy: 48, r: 10, flash: true }] },
      },
      'mate-60-pro': {
        label: 'Huawei Mate 60 Pro', viewBox: '0 0 400 880',
        caseW: 380, caseH: 858, caseX: 10, caseY: 11, rx: 54,
        design: { x: 28, y: 88, w: 344, h: 700, r: 38 },
        cam: { type: 'leica-circ', bx: 18, by: 14, bw: 150, bh: 150, br: 75,
          lenses: [{ cx: 57, cy: 57, r: 28 }, { cx: 111, cy: 57, r: 28 }, { cx: 57, cy: 111, r: 28 }, { cx: 111, cy: 111, r: 28 }, { cx: 84, cy: 84, r: 13, flash: true }] },
      },
    },
  },
};
