<script setup lang="ts">
import { Sidebar, InputColor, ShowColor, Alert } from '@/component'
import { Header, Footer } from '@/pages'
import { ref } from 'vue';
import type { ColorData } from '@/types';

const colorInfo = ref<ColorData>(
  {
    hex: '#dddfe2',
    rgb: { r: 221, g: 223, b: 226 },
    cmyk: { c: 2, m: 1, y: 0, k: 11 },
    hsl: { h: 216, s: 8, l: 88 },
    hsv: { h: 216, s: 2, v: 89 },
  }
);
const handleColor = (newObj: ColorData): void => {
  colorInfo.value = newObj;
};

</script>

<template>
  <Header />
  <Alert />
  <div class="main">
    <Sidebar />
    <div class="content">
      <InputColor @send-color="handleColor" />
      <ShowColor :user="colorInfo" />
    </div>
    <Sidebar />
  </div>
  <Footer />
</template>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 75%;
  padding: 15px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>