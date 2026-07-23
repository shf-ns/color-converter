<script setup lang="ts">
</script>

<template>
  <div class="sidebar">
    <h1>工具箱</h1>
    <ul class="nav">
      <li class="color-converter">
        <div class="color-converter-icon">
          <img src="./assets/img/shouyechangguishouye-copy-copy.png" alt="">
        </div>
        <span>所有工具</span>
      </li>
    </ul>
  </div>
  <div class="main">主题</div>
</template>

<style scoped>
.sidebar {
  width: 20%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
}

.nav {
  padding: 5px;
  margin-top: 30px;
}

.color-converter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.color-converter-icon {
  width: 25px;
  height: 25px;
}

.color-converter-icon img {
  width: 100%;
  height: 100%;
}
</style>
