import type { DetectType } from "@/types";

/**
 * 检测颜色值类型
 *
 * @param value 颜色值
 * @returns 颜色值类型
 */
export function detectType(value: string): DetectType {
  if (value.startsWith("#")) return "hex";
  if (value.startsWith("rgb")) return "rgb";
  if (value.startsWith("hsl")) return "hsl";
  if (value.startsWith("hsv")) return "hsv";
  if (value.startsWith("cmyk")) return "cmyk";
  return "hex";
}
