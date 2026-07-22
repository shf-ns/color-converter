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
  <div class="footer">
    <span>Copyright © 2026 shf-ns</span>
    <span>|</span>
    <a href="https://github.com/shf-ns/color-converter" class="github">GitHub</a>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 11%;
  padding: 15px;
}

.main {
  display: flex;
  width: 100%;
  height: 80%;
}

.content {
  flex: 1;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 8%;
  color: #999;
  font-size: 14px;
}

.footer .github:hover {
  color: #333;
  text-decoration: underline;
}
</style>
