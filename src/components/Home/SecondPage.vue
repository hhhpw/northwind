<!-- second screen page -->
<template>
  <div class="second-wrap">
    <div class="content-wrap">
      <img class="bg" src="../../assets/home/new-home/second-bg.png" alt="" />
      <img
        class="cat"
        src="../../assets/home/new-home/second-img1.png"
        alt=""
      />
      <img
        class="desc"
        src="../../assets/home/new-home/second-desc.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.second-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-wrap {
    width: 90%;
    height: fit-content;
    position: relative;
    .bg {
      width: 100%;
    }
    .cat {
      position: absolute;
      top: 33%;
      left: 26%;
      width: 14%;
    }
    .desc {
      width: 40%;
      height: 90%;
      position: absolute;
      right: 10%;
      bottom: -10%;
    }
  }
}
</style>
