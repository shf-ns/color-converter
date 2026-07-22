<script setup lang="ts">
import { Sidebar } from '@/component'
</script>

<template>
  <h1>一个简易的颜色转换器</h1>
  <hr>
  <div class="main">
    <Sidebar />
    <div class="content">内容区域</div>
    <Sidebar />
  </div>
  <hr>
  <div class="footer">页脚区域</div>
</template>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 80%;
}

.content {
  flex: 1;
}
</style>
