<!-- four screen page -->
<template>
  <div class="wrap">
    <div class="content">
      <img :src="HOME_CONSTANTS.PHOTO_CAT" alt="" />
      <div class="desc-wrap">
        <p>NFT Market</p>
        <p>
          NFT is an auction house for digital cats to auction rare artworks.
          Pick and collect your favorite artworks here. Each one is unique
        </p>
      </div>
    </div>
    <div class="bg"></div>
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
  position: relative;
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
  .bg {
    position: absolute;
    left: 0;
    top: 40%;
    width: 30%;
    height: 60%;
    background: linear-gradient(166deg, #de7d00 0%, #feca4a 100%);
    opacity: 0.43;
    filter: blur(138px);
  }
}
</style>
