<script setup lang="ts">
import { Sidebar, InputColor, ShowColor } from '@/component'
import { Header, Footer } from '@/pages'
</script>

<template>
  <Header />
  <div class="main">
    <Sidebar />
    <div class="content">
      <InputColor />
      <ShowColor />
    </div>
    <Sidebar />
  </div>
  <Footer />
</template>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 75%;
  padding: 15px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
