<script setup lang="ts">
</script>

<template>
  <div class="footer">
    <span>Copyright © 2026 shf-ns</span>
    <span>|</span>
    <a href="https://github.com/shf-ns/color-converter" class="github">GitHub</a>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 8%;
  color: #999;
  font-size: 14px;
  background-color: #f8f8f8;
  border-top: 1px solid #e5e5e5;
}

.footer .github {
  text-decoration: underline;
}

.footer .github:hover {
  color: #1e90ff;
}
</style>
