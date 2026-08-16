<script lang="ts" setup>
import { onUnmounted, watch } from 'vue';
import { useCopyStore } from '@/store/useCopyStore'

const copyStore = useCopyStore()

let timerSucceed: ReturnType<typeof setTimeout> | undefined = undefined
let timerFailed: ReturnType<typeof setTimeout> | undefined = undefined

watch(() => [copyStore.isCopySucceed, copyStore.isCopyFailed], ([newS, newF]) => {
  if (newS) {
    timerSucceed = setTimeout(() => {
      copyStore.isCopySucceed = false
    }, 1500)
  }

  if (newF) {
    timerFailed = setTimeout(() => {
      copyStore.isCopyFailed = false
    }, 1500)
  }
})

// 组件卸载时清除定时器
onUnmounted((): void => {
  clearTimeout(timerSucceed)
  clearTimeout(timerFailed)
})

</script>

<template>
  <div class="alert-success" v-show="copyStore.isCopySucceed">复制成功</div>
  <div class="alert-error" v-show="copyStore.isCopyFailed">复制失败</div>
</template>

<style scoped>
.alert-success {
  position: absolute;
  top: 10%;
  right: 40%;
  width: 200px;
  height: 50px;
  color: green;
  text-align: center;
  line-height: 50px;
  border-radius: 10px;
  background-color: #d1e7dd;
}


.alert-error {
  position: absolute;
  top: 10%;
  right: 40%;
  width: 200px;
  height: 50px;
  color: red;
  text-align: center;
  line-height: 50px;
  border-radius: 10px;
  background-color: #f8d7da;
}
</style>