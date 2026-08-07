import type { HSL, HSV, RGB, CMYK } from "../types/index.ts";

/**
 * HEX 颜色值转换为 RGB 颜色值
 *
 * @param hex HEX 颜色值
 * @returns RGB 颜色值
 */
function hexToRgb(hex: string): RGB | null {
  let color: string = hex.trim().replace("#", "");

  if (color.length !== 6) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (color.length === 6 || color.length === 8) {
    const r: number = parseInt(color.substring(0, 2), 16);
    const g: number = parseInt(color.substring(2, 4), 16);
    const b: number = parseInt(color.substring(4, 6), 16);

    // 防止 parseFloat 解析出 NaN（例如传入非法字符）
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

/**
 * HSL 颜色值转换为 RGB 颜色值的辅助函数
 *
 * @param p 颜色值 p
 * @param q 颜色值 q
 * @param t 颜色值 t
 * @returns 颜色值
 */
function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function rgbToRgb(rgb: string): RGB {
  const value = rgb.split(",");
  const r: number = Number(value[0].slice(-3));
  const g: number = Number(value[1].trim());
  const b: number = Number(value[2].trim().slice(0, 3));
  return { r, g, b };
}

/**
 * HSL 颜色值转换为 RGB 颜色值
 *
 * @param hsl HSL 颜色值
 * @returns RGB 颜色值
 */
function hslToRgb(hsl: HSL): RGB {
  let { h, s, l } = hsl;

  s = s / 100;
  l = l / 100;

  if (s === 0) {
    l = l * 255;
    return { r: l, g: l, b: l };
  } else {
    const q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p: number = 2 * l - q;
    h = h / 360;

    const r: number = hueToRgb(p, q, h + 1 / 3) * 255;
    const g: number = hueToRgb(p, q, h) * 255;
    const b: number = hueToRgb(p, q, h - 1 / 3) * 255;
    return { r, g, b };
  }
}

/**
 * HSV 颜色值转换为 RGB 颜色值
 *
 * @param hsv HSV 颜色值
 * @returns RGB 颜色值
 */
function hsvToRgb(hsv: HSV): RGB {
  let { h, s, v } = hsv;

  s = s / 100;
  v = v / 100;
  if (s === 0) {
    v = v * 255;
    return { r: v, g: v, b: v };
  } else {
    h = (h % 360) / 60;
    const i: number = Math.floor(h);
    const f: number = h - i;
    const p: number = v * (1 - s);
    const q: number = v * (1 - s * f);
    const t: number = v * (1 - s * (1 - f));

    switch (i) {
      case 0:
        return { r: v * 255, g: t * 255, b: p * 255 };
      case 1:
        return { r: q * 255, g: v * 255, b: p * 255 };
      case 2:
        return { r: p * 255, g: v * 255, b: t * 255 };
      case 3:
        return { r: p * 255, g: q * 255, b: v * 255 };
      case 4:
        return { r: t * 255, g: p * 255, b: v * 255 };
      case 5:
        return { r: v * 255, g: p * 255, b: q * 255 };
      default:
        return { r: 0, g: 0, b: 0 };
    }
  }
}

/**
 * CMYK 颜色值转换为 RGB 颜色值
 *
 * @param cmyk CMYK 颜色值
 * @returns RGB 颜色值
 */
function cmykToRgb(cmyk: CMYK): RGB {
  let { c, m, y, k } = cmyk;

  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;

  const r: number = 255 * (1 - c) * (1 - k);
  const g: number = 255 * (1 - m) * (1 - k);
  const b: number = 255 * (1 - y) * (1 - k);
  return { r, g, b };
}

export { hexToRgb, hslToRgb, hsvToRgb, cmykToRgb, rgbToRgb };
