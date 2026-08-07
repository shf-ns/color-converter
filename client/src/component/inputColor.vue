<script lang="ts" setup>
import { ref } from "vue";
import type { RGB, HSL, HSV, CMYK } from "@/types";

const colorValue = ref<string>("#dddfe2");

/**
 * 检测颜色值类型
 * 
 * @param value 颜色值
 * @returns 颜色值类型
 */
function detectType(value: string): "hex" | "rgb" | "hsl" | "hsv" | "cmyk" {
  if (value.startsWith('#')) return 'hex'
  if (value.startsWith('rgb')) return 'rgb'
  if (value.startsWith('hsl')) return 'hsl'
  if (value.startsWith('hsv')) return 'hsv'
  if (value.startsWith('cmyk')) return 'cmyk'
  return 'hex'
}
const submitColor = async (): Promise<void> => {
  const type: "hex" | "rgb" | "hsl" | "hsv" | "cmyk" = detectType(colorValue.value.trim())
  const value: string = colorValue.value.trim()

  try {
    const res = await fetch('/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, value }),
    })
    const data = await res.json()
    colorResult.value = data
  } catch (err) {
    console.error('请求失败:', err)
  }
};

// 转换结果，传给 showColor
const colorResult = ref<{ hex: string, rgb: RGB, cmyk: CMYK, hsl: HSL, hsv: HSV }>({
  hex: '#dddfe2',
  rgb: { r: 221, g: 223, b: 226 },
  cmyk: { c: 2, m: 1, y: 0, k: 11 },
  hsl: { h: 216, s: 8, l: 88 },
  hsv: { h: 216, s: 2, v: 89 },
})

</script>

<template>
  <div class="input-box">
    <span class="input-title">输入颜色值</span>
    <input type="text" class="input-color" v-model="colorValue" />
    <button class="input-btn" @click="submitColor">确认</button>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-title {
  font-size: 16px;
  font-weight: bold;
}

.input-color {
  flex: 1;
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.input-btn {
  height: 40px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
}

.input-btn:hover {
  background-color: #e5e7eb;
}
</style>