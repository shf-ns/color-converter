<script lang="ts" setup>
import { ref } from "vue";
import type { DetectType, ColorData } from "@/types";
import { detectType, debounceAdvanced } from "@/tool";
import { useInputStore } from "@/store/";

const inputStore = useInputStore()

const colorValue = ref<string>("#dddfe2");

const emit: (event: "send-color", ...args: any[]) => void = defineEmits(['send-color']);

// 转换结果，传给 showColor
const colorResult = ref<ColorData>({
  hex: '#dddfe2',
  rgb: { r: 221, g: 223, b: 226 },
  cmyk: { c: 2, m: 1, y: 0, k: 11 },
  hsl: { h: 216, s: 8, l: 88 },
  hsv: { h: 216, s: 2, v: 89 },
})

const submitColor = debounceAdvanced(async (): Promise<void> => {
  const type: DetectType = detectType(colorValue.value.trim())
  const value: string = colorValue.value.trim()

  try {
    const res: Response = await fetch('/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, value }),
    })
    colorResult.value = await res.json()
    inputStore.isConvertSucceed = true
    emit('send-color', colorResult.value)
  } catch (err) {
    inputStore.isConvertFailed = true
    console.error('请求失败:', err)
  }
}, 500);


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