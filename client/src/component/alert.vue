<script lang="ts" setup>
import { ref } from 'vue'

const showSuccess = ref<boolean>(false)
const showError = ref<boolean>(false)
</script>

<template>
  <div class="alert-success" v-show="showSuccess">复制成功</div>
  <div class="alert-error" v-show="showError">复制失败</div>
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
  animation: alert 0.5s ease-out;
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
  animation: alert 0.5s ease-out;
}

@keyframes alert {
  0% {
    top: 0%;
  }

  50% {
    top: 5%;
  }

  100% {
    top: 10%;
  }
}
</style>