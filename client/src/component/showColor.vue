<script lang="ts" setup>
import { useCopyStore } from '@/store/useCopyStore';
import type { DetectType } from '@/types';

const copyStore = useCopyStore()

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});


const copyShow = async (type: DetectType): Promise<void> => {
  if (type === 'rgb') {
    await copyStore.copy('rgb(' + props.user.rgb.r + ',' + props.user.rgb.g + ',' + props.user.rgb.b + ')')

  } else if (type === 'hex') {
    await copyStore.copy(props.user.hex)

  } else if (type === 'cmyk') {
    await copyStore.copy('cmyk(' + props.user.cmyk.c + ', ' + props.user.cmyk.m + ', ' + props.user.cmyk.y + ', ' + props.user.cmyk.k + ')')

  } else if (type === 'hsv') {
    await copyStore.copy('hsv(' + props.user.hsv.h + ', ' + props.user.hsv.s + ', ' + props.user.hsv.v + ')')

  } else if (type === 'hsl') {
    await copyStore.copy('hsl(' + props.user.hsl.h + ', ' + props.user.hsl.s + ', ' + props.user.hsl.l + ')')

  }
}

</script>

<template>
  <ul class="show-color">
    <li>
      <span class="title">RGB</span>
      <p class="result">rgb({{ props.user.rgb.r }}, {{ props.user.rgb.g }}, {{ props.user.rgb.b }})</p>
      <button class="copy-btn" @click="copyShow('rgb')">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HEX</span>
      <p class="result">{{ props.user.hex }}</p>
      <button class="copy-btn" @click="copyShow('hex')">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">CMYK</span>
      <p class="result">cmyk({{ props.user.cmyk.c }}%, {{ props.user.cmyk.m }}%, {{ props.user.cmyk.y }}%, {{
        props.user.cmyk.k }}%)</p>
      <button class="copy-btn" @click="copyShow('cmyk')">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HSV</span>
      <p class="result">hsv({{ props.user.hsv.h }}, {{ props.user.hsv.s }}%, {{ props.user.hsv.v }}%)</p>
      <button class="copy-btn" @click="copyShow('hsv')">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HSL</span>
      <p class="result">hsl({{ props.user.hsl.h }}, {{ props.user.hsl.s }}%, {{ props.user.hsl.l }}%)</p>
      <button class="copy-btn" @click="copyShow('hsl')">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.show-color {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 20px;
}

.show-color li {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #f8f9fb;
  border-radius: 10px;
}

.show-color .title {
  width: 55px;
  height: 100%;
  padding-top: 15px;
  color: #374151;
  font-size: 14px;
  text-align: center;
  background: #e5e7eb;
  border-radius: 10px 0 0 10px;
}

.show-color .result {
  flex: 1;
  height: 100%;
  padding-top: 13px;
  padding-left: 15px;
}

.show-color .copy-btn {
  width: 50px;
  height: 100%;
  border: none;
  background: transparent;
  padding: 13px 10px 10px 12px;
  cursor: pointer;
}

.show-color .copy-btn .imgs {
  width: 25px;
  height: 25px;
  overflow: hidden;
}

.show-color .imgs img {
  width: 100%;
  height: 100%;
}
</style>