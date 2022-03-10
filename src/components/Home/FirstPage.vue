<!-- first screen page -->
<template>
  <div class="first-wrap">
    <div class="content-wrap">
      <div class="desc">
        <span>Fishing Crypto with kiko</span>
        <span>Swap，earn and win crypto on a safe and creative multiverse</span>
        <button>Swap Now</button>
      </div>
      <img src="../../assets/home/new-home/cat.png" alt="" />
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.first-wrap {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/home/new-home/first-screen-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .content-wrap {
    width: 70%;
    height: 60%;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .desc {
      display: flex;
      flex-direction: column;
      span:first-child {
        font-size: 40px;
        font-family: Denmark;
        color: #ffffff;
        line-height: 64px;
      }
      span:nth-child(2) {
        margin-top: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 22px;
      }
      button {
        width: 190px;
        height: 50px;
        background-image: url("../../assets/home/new-home/btn-bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30%;
        border: none;
      }
    }
    img {
      height: 80%;
    }
  }
}
</style>
