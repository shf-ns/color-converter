<script setup lang="ts">
import { Sidebar } from '@/component'
</script>

<template>
  <div class="header">
    <h1>一个简易的颜色转换器</h1>
  </div>
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
.header {
  width: 100%;
  height: 12%;
  padding: 20px;
}

.main {
  display: flex;
  width: 100%;
  height: 75%;
}

.content {
  flex: 1;
}

.footer {
  width: 100%;
  height: 12%;
}
</style>
