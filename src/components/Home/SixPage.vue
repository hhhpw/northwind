<!-- six screen page -->
<template>
  <div class="six-wrap">
    <div class="content-wrap">
      <img src="../../assets/home/new-home/six-content.png" alt="" />
      <img
        class="quare"
        src="../../assets/home/new-home/six-quare.png"
        alt=""
      />
      <div class="bg"></div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.six-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content-wrap {
    width: 80%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(254, 201, 73, 0.14);
    border-radius: 53px;
    img {
      width: 120%;
    }
  }
  .quare {
    width: 30% !important;
    position: absolute;
    right: -7%;
    top: -6%;
  }
  .bg {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: 40%;
    background: linear-gradient(166deg, #de7d00 0%, #feca4a 100%);
    opacity: 0.63;
    filter: blur(138px);
  }
}
</style>
