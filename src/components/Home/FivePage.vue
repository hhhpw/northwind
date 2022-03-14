<!-- five screen page -->
<template>
  <div class="wrap">
    <div class="content">
      <div class="desc-wrap">
        <p>Liquidity</p>
        <p>
          Swap is a mall for digital cats to trade at any time. Buy/sell
          Starcoin here
        </p>
      </div>
      <img :src="HOME_CONSTANTS.LIQUIDITY_CAT" alt="" />
    </div>
  </div>
</template>

<script setup>
import HOME_CONSTANTS from "@constants/home";
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 70%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .desc-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p:first-child {
        font-size: 24px;
        font-family: DenmarkRegular;
        color: #feffff;
        line-height: 29px;
      }
      p:last-child {
        width: 270px;
        margin-top: 18px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #feffff;
        line-height: 20px;
      }
    }
    & > img {
      width: 70%;
    }
  }
}
</style>
