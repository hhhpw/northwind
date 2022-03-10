<!-- four screen page -->
<template>
  <div class="wrap">
    <div class="content">
      <img src="../../assets/home/new-home/four-cat.png" alt="" />
      <div class="desc-wrap">
        <p>NFT Market</p>
        <p>
          NFT is an auction house for digital cats to auction rare artworks.
          Pick and collect your favorite artworks here. Each one is unique
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
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
        font-family: Denmark;
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
  }
}
</style>
