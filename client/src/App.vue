<script setup lang="ts">
import { Sidebar, InputColor } from '@/component'
import { Header, Footer } from '@/pages'
</script>

<template>
  <Header />
  <div class="main">
    <Sidebar />
    <div class="content">
      <InputColor />
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
}

.content {
  flex: 1;
}
</style>
