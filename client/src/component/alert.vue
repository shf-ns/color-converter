<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useCopyStore } from '@/store/useCopyStore'

const copyStore = useCopyStore()

onMounted((): void => {
  const timer = setTimeout(() => {
    copyStore.isCopy = false
  }, 1000)

  // 组件卸载时清除定时器
  onUnmounted((): void => {
    clearTimeout(timer)
  })
})

</script>

<template>
  <div class="alert-success" v-show="copyStore.isCopy">复制成功</div>
  <div class="alert-error" v-show="!copyStore.isCopy">复制失败</div>
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