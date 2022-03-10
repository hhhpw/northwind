<!-- seven screen page -->
<template>
  <div class="seven-wrap">
    <img class="bg" src="../../assets/home/new-home/seven-img.png" alt="" />
    <img class="coin" src="../../assets/home/new-home/seven-coin.png" alt="" />
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.seven-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
  }
  .coin {
    width: 474px;
    height: 400px;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
