import type { RGB, CMYK, HSV } from '../types/index.ts'

function hexToRgb(hex: string): RGB | null {
  let color: string = hex.trim().replace('#', '')

  if(color.length !== 6) {
    color = color.split('').map(c => c + c).join('');
  }

  if(color.length === 6 || color.length === 8){
    const r:number = parseInt(color.substring(0, 2), 16);
    const g:number = parseInt(color.substring(2, 4), 16);
    const b:number = parseInt(color.substring(4, 6), 16);

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

  const rn:number = r / 255;
  const gn:number = g / 255;
  const bn:number = b / 255;

  let k:number = 1 - Math.max(rn, gn, bn);

  if(k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }else {
    const c:number = (1 - rn - k) / (1 - k) * 100;
    const m:number = (1 - gn - k) / (1 - k) * 100;
    const y:number = (1 - bn - k) / (1 - k) * 100;
    k = k * 100;
    return { c, m, y, k };
  }
}

function rgbToHsv(rgb: RGB) {
  const { r, g, b } = rgb;

  const rn:number = r / 255;
  const gn:number = g / 255;
  const bn:number = b / 255;

  const max:number = Math.max(rn, gn, bn);
  const min:number = Math.min(rn, gn, bn);
  const delta:number = max - min;

  //色相 H
  let h:number = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = 60 * (((gn - bn) / delta) % 6);
    } else if (max === gn) {
      h = 60 * ((bn - rn) / delta + 2);
    } else if (max === bn) {
      h = 60 * ((rn - gn) / delta + 4);
    }
    if (h < 0) {
      h += 360;
    }
  }

  //饱和度 S
  let s:number = 0;

  if(max !== 0) {
    s = delta / max * 100;
  }

  //亮度 V
  let v:number = max * 100;
  
  return { h, s, v };
}
