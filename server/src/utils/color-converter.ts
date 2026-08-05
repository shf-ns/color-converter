import type { RGB } from '../types/rgb.ts'

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