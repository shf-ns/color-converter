<script lang="ts" setup></script>

<template>
  <div class="input-box">
    <span class="input-title">输入颜色值</span>
    <input type="text" class="input-color" />
    <button class="input-btn">确认</button>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-title {
  font-size: 16px;
  font-weight: bold;
}

.input-color {
  flex: 1;
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.input-btn {
  height: 40px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.input-btn:hover {
  background-color: #e5e7eb;
}
</style>