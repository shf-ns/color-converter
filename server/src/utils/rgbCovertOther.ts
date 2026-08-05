import type { RGB, CMYK, HSV, HSL } from "../types/index.ts";

/**
 * RGB 归一化 RGB 颜色值
 *
 * @param rgb RGB 颜色值
 * @returns 归一化后的 RGB 颜色值
 */
function normalization(rgb: RGB): { rn: number; gn: number; bn: number } {
  const { r, g, b } = rgb;

  const rn: number = r / 255;
  const gn: number = g / 255;
  const bn: number = b / 255;

  return { rn, gn, bn };
}

/**
 * RGB 转换 十六进制
 *
 * @param rgb RGB 颜色值
 * @returns 十六进制颜色值
 */
function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * RGB 转换 CMYK 颜色值
 *
 * @param rgb RGB 颜色值
 * @returns CMYK 颜色值
 */
function rgbToCmyk(rgb: RGB): CMYK {
  const { rn, gn, bn } = normalization(rgb);

  let k: number = 1 - Math.max(rn, gn, bn);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  } else {
    const m: number = Math.round(((1 - gn - k) / (1 - k)) * 100);
    const c: number = Math.round(((1 - rn - k) / (1 - k)) * 100);
    const y: number = Math.round(((1 - bn - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    return { c, m, y, k };
  }
}

/**
 * RGB 转换 HSV 颜色值
 *
 * @param rgb RGB 颜色值
 * @returns HSV 颜色值
 */
function rgbToHsv(rgb: RGB): HSV {
  const { rn, gn, bn } = normalization(rgb);

  const max: number = Math.max(rn, gn, bn);
  const min: number = Math.min(rn, gn, bn);
  const delta: number = max - min;

  //色相 H
  let h: number = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = Math.round(60 * (((gn - bn) / delta) % 6));
    } else if (max === gn) {
      h = Math.round(60 * ((bn - rn) / delta + 2));
    } else if (max === bn) {
      h = Math.round(60 * ((rn - gn) / delta + 4));
    }
    if (h < 0) {
      h += 360;
    }
  }

  //饱和度 S
  let s: number = 0;

  if (max !== 0) {
    s = Math.round((delta / max) * 100);
  }

  //亮度 V
  let v: number = Math.round(max * 100);

  return { h, s, v };
}

/**
 * RGB 转换 HSL 颜色值
 *
 * @param rgb RGB 颜色值
 * @returns HSL 颜色值
 */
function rgbToHsl(rgb: RGB): HSL {
  const { rn, gn, bn } = normalization(rgb);

  const max: number = Math.max(rn, gn, bn);
  const min: number = Math.min(rn, gn, bn);
  const delta: number = max - min;

  let l: number = (max + min) / 2;

  //色相 H
  let h: number = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = Math.round(60 * (((gn - bn) / delta) % 6));
    } else if (max === gn) {
      h = Math.round(60 * ((bn - rn) / delta + 2));
    } else if (max === bn) {
      h = Math.round(60 * ((rn - gn) / delta + 4));
    }
    if (h < 0) {
      h += 360;
    }
  }

  //饱和度 S
  let s: number = 0;

  if (delta !== 0) {
    if (l <= 0.5) {
      s = Math.round((delta / (max + min)) * 100);
    } else if (l > 0.5) {
      s = Math.round((delta / (2 - max - min)) * 100);
    }
  }

  //亮度 L
  l = Math.round(l * 100);

  return { h, s, l };
}

export { rgbToHex, rgbToCmyk, rgbToHsv, rgbToHsl };
