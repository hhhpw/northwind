<!-- first screen page -->
<template>
  <div class="first-wrap">
    <div class="content-wrap">
      <div class="desc">
        <span>Fishing Crypto with kiko</span>
        <span>Swap，earn and win crypto on a safe and creative multiverse</span>
        <div @click="handleGoSwap">Swap Now</div>
      </div>
      <img :src="HOME_CONSTANTS.PLUTUS_CAT" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import HOME_CONSTANTS from "@constants/home";
const router = useRouter();
const handleGoSwap = () => {
  router.push("/swap");
};
</script>
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
    height: 80%;
    position: absolute;
    top: 10%;
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
        font-family: DenmarkRegular;
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
      & > div {
        width: 190px;
        height: 50px;
        background-image: url("../../assets/home/new-home/btn-bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 47px;
        border: none;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 28px;
        cursor: pointer;
      }
    }
    img {
      height: 100%;
      margin-right: -10%;
    }
  }
}
</style>
