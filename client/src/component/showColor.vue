<script lang="ts" setup></script>

<template>
  <ul class="show-color">
    <li>
      <span class="title">RGB</span>
      <p class="result">rgb(221, 223, 226)</p>
      <button class="copy-btn">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HEX</span>
      <p class="result">#dddfe2</p>
      <button class="copy-btn">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">CMYK</span>
      <p class="result">cmyk(2%, 1%, 0%, 11%)</p>
      <button class="copy-btn">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HSV</span>
      <p class="result">hsv(216, 2%, 89%)</p>
      <button class="copy-btn">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
    <li>
      <span class="title">HSL</span>
      <p class="result">hsl(216, 8%, 88%)</p>
      <button class="copy-btn">
        <div class="imgs">
          <img src="../assets/img/niantieban.png" alt="复制">
        </div>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.show-color {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 20px;
}

.show-color li {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #f8f9fb;
  border-radius: 10px;
}

.show-color .title {
  width: 55px;
  height: 100%;
  padding-top: 15px;
  color: #374151;
  font-size: 14px;
  text-align: center;
  background: #e5e7eb;
  border-radius: 10px 0 0 10px;
}

.show-color .result {
  flex: 1;
  height: 100%;
  padding-top: 13px;
  padding-left: 15px;
}

.show-color .copy-btn {
  width: 50px;
  height: 100%;
  border: none;
  background: transparent;
  padding: 13px 10px 10px 12px;
  cursor: pointer;
}

.show-color .copy-btn .imgs {
  width: 25px;
  height: 25px;
  overflow: hidden;
}

.show-color .imgs img {
  width: 100%;
  height: 100%;
}
</style>
