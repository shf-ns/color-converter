import type { RGB, CMYK } from '../types/index.ts'

function hexToRgb(hex: string): RGB | null {
  let color = hex.trim().replace('#', '')

  if(color.length !== 6) {
    color = color.split('').map(c => c + c).join('');
  }

  if(color.length === 6 || color.length === 8){
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // 防止 parseFloat 解析出 NaN（例如传入非法字符）
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

function rgbToHex(rgb: RGB): string {
  return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
}

function rgbToCmyk(rgb: RGB): CMYK {
  const { r, g, b } = rgb;

  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  let k = 1 - Math.max(rn, gn, bn);

  if(k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }else {
    const c = (1 - rn - k) / (1 - k) * 100;
    const m = (1 - gn - k) / (1 - k) * 100;
    const y = (1 - bn - k) / (1 - k) * 100;
    k = k * 100;
    return { c, m, y, k };
  }
}