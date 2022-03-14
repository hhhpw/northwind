<!-- second screen page -->
<template>
  <div class="second-wrap">
    <div class="content-wrap">
      <img class="bg" src="../../assets/home/new-home/second-bg.png" alt="" />
      <img
        class="cat"
        v-image="HOME_CONSTANTS.RUNNING_CAT"
        :default-img="defaultImg"
        alt=""
      />
      <div class="desc-wrap">
        <img
          class="desc"
          src="../../assets/home/new-home/second-desc.png"
          alt=""
        />
        <div class="click-area" @click.stop="handleLearnMore"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HOME_CONSTANTS from "@constants/home";

const defaultImg = require("../../assets/home/new-home/second-img1.png");
const handleLearnMore = () => {
  console.log("handle learn more");
};
</script>
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
    margin-top: -10%;
    .bg {
      width: 100%;
    }
    .cat {
      position: absolute;
      top: 20%;
      left: 10%;
      width: 40%;
    }
    .desc-wrap {
      width: 40%;
      height: fit-content;
      position: absolute;
      right: 10%;
      bottom: -20%;
      .desc {
        width: 100%;
      }
      .click-area {
        position: absolute;
        bottom: 10%;
        left: 5%;
        width: 50%;
        height: 13%;
        z-index: 10;
        cursor: pointer;
      }
    }
  }
}
</style>
