<script lang="ts" setup>
import { ref } from "vue";
import type { DetectType, ColorData } from "@/types";

const colorValue = ref<string>("#dddfe2");

/**
 * 检测颜色值类型
 * 
 * @param value 颜色值
 * @returns 颜色值类型
 */
function detectType(value: string): DetectType {
  if (value.startsWith('#')) return 'hex'
  if (value.startsWith('rgb')) return 'rgb'
  if (value.startsWith('hsl')) return 'hsl'
  if (value.startsWith('hsv')) return 'hsv'
  if (value.startsWith('cmyk')) return 'cmyk'
  return 'hex'
}
const submitColor = async (): Promise<void> => {
  const type: DetectType = detectType(colorValue.value.trim())
  const value: string = colorValue.value.trim()

  // 转换结果，传给 showColor
  const colorResult = ref<ColorData>({
    hex: '',
    rgb: { r: 0, g: 0, b: 0 },
    cmyk: { c: 0, m: 0, y: 0, k: 0 },
    hsl: { h: 0, s: 0, l: 0 },
    hsv: { h: 0, s: 0, v: 0 },
  })

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