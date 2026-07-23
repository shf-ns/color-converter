<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div class="main">
      <ul class="content">
        <li>颜色转换器</li>
      </ul>
    </div>
    <div class="footer">
      <span>Copyright © 2026 shf-ns</span>
      <span>|</span>
      <a href="https://github.com/shf-ns/tool-box">Github</a>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  gap: 10px;
  color: #999;
  fill: #999;
  font-size: 14px;
  background-color: #f8f8f8;
  border-top: 1px solid #e5e5e5;
}

.footer a {
  text-decoration: underline;
}

.footer a:hover {
  color: #1e90ff;
}
</style>