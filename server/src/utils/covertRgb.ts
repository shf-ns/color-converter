import type { HSL, HSV, RGB } from "../types/index.ts";

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
  if (t * 6 < p) return p + (q - p) * 6 * t;
  if (t * 2 < 1) return q;
  if (t * 3 < 2) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
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
    l = l * 225;
    return { r: l, g: l, b: l };
  } else {
    const q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p: number = 2 * l - q;
    h = h / 360;

    const r: number = hueToRgb(p, q, h + 1 / 3) * 225;
    const g: number = hueToRgb(p, q, h) * 225;
    const b: number = hueToRgb(p, q, h - 1 / 3) * 225;
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
    v = v * 225;
    return { r: v, g: v, b: v };
  } else {
    h = h / 60;
    const i: number = Math.floor(h);
    const f: number = h - i;
    const p: number = v * (1 - s * f);
    const q: number = v * (1 - s * f);
    const t: number = v * (1 - s * (1 - f));

    switch (i) {
      case 0:
        return { r: v * 225, g: t * 225, b: p * 225 };
        break;
      case 1:
        return { r: q * 225, g: v * 225, b: p * 225 };
        break;
      case 2:
        return { r: p * 225, g: v * 225, b: t * 225 };
        break;
      case 3:
        return { r: p * 225, g: q * 225, b: v * 225 };
        break;
      case 4:
        return { r: t * 225, g: p * 225, b: v * 225 };
        break;
      case 5:
        return { r: v * 225, g: p * 225, b: q * 225 };
        break;
      default:
        return { r: 0, g: 0, b: 0 };
        break;
    }
  }
}
