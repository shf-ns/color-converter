<script lang="ts" setup>
import { onUnmounted, watch } from 'vue';
import { useCopyStore, useInputStore } from '@/store/'

const copyStore = useCopyStore()
const inputStore = useInputStore()

//------------复制相关提示功能--------------

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


//------------转换相关提示功能--------------

let timerConvertSucceed: ReturnType<typeof setTimeout> | undefined = undefined
let timerConvertFailed: ReturnType<typeof setTimeout> | undefined = undefined

watch(() => [inputStore.isConvertSucceed, inputStore.isConvertFailed], ([newS, newF]) => {
  if (newS) {
    timerConvertSucceed = setTimeout(() => {
      inputStore.isConvertSucceed = false
    }, 1500)
  }

  if (newF) {
    timerFailed = setTimeout(() => {
      inputStore.isConvertFailed = false
    }, 1500)
  }
})

// 组件卸载时清除定时器
onUnmounted((): void => {
  clearTimeout(timerSucceed)
  clearTimeout(timerFailed)
  clearTimeout(timerConvertSucceed)
  clearTimeout(timerConvertFailed)
})

</script>

<template>
  <div class="alert-success" v-show="copyStore.isCopySucceed">复制成功</div>
  <div class="alert-error" v-show="copyStore.isCopyFailed">复制失败</div>

  <div class="alert-success" v-show="inputStore.isConvertSucceed">转换成功</div>
  <div class="alert-error" v-show="inputStore.isConvertFailed">转换失败</div>
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