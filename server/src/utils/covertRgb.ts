import type { RGB } from "../types/index.ts";

/**
 * HEX 颜色值转换为 RGB 颜色值
 * 
 * @param hex HEX 颜色值
 * @returns RGB 颜色值
 */
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