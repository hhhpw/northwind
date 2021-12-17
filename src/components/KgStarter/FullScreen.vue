<template>
  <div :class="$style['full-screen-container']">
    <div :class="$style['full-screen-container-header']">
      <img src="../../assets/igo/header.png" />
    </div>
    <div :class="$style['full-screen-container-content']">
      <div :class="$style['full-screen-container-content-mask']">
        <div :class="$style['full-screen-container-content-main']">
          <div :class="$style['full-screen-container-content-main-core']">
            <img src="../../assets/igo/logo-B.png" :class="$style['logo']" />
            <p :class="$style['full-screen-container-content-main-desc']">
              同样的代码，如何判断谁的代码是优秀的代码？可读性，可扩展性，健壮性可能都可以用来判定，
              然而这些东西我觉得并不能直接体现出你代码的优秀，因为对用户而言，访问你的代码响应速度快那就是优秀的代码，
              相反，动辄响应几秒甚至更长时间的接口，恐怕就算你可读性再好，再健壮也称不上是好代码。
            </p>
            <screen-data></screen-data>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import ScreenData from "./ScreenData.vue";
</script>
<style lang="scss" module>
.full-screen-container {
  position: fixed;
  top: 0px;
  left: 200px;
  background: #fcb502;
  height: 100%;
  width: calc(100vw - 200px);
  .full-screen-container-header {
    padding: 20px;
    padding-bottom: 10px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      text-align: center;
      height: 20px;
    }
  }
  .full-screen-container-content {
    // min-height: 550px;
    height: calc(100% - 200px);
    width: 1000px;
    margin: 0 auto;
    margin-top: 10px;
    // background: #000000;
    background-image: url("../../assets/igo/kg-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    border: 15px solid #283037;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: calc(100% + 40px);
      width: calc(100% + 40px);
      top: -20px;
      left: -20px;
      border-radius: 4px;
      background: linear-gradient(#dc8c04, #fec944);
      z-index: -1;
    }
    .full-screen-container-content-mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
    }
    .full-screen-container-content-main {
      // border: 2px solid red;
      background-image: url("../../assets/igo/kg-content-header.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: calc(100% - 50px);
      margin: 0 auto;
      margin-top: 20px;
      height: calc(100% - 50px);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      // border: 1px solid red;
      // height: 500px;
      // display: flex;
      text-align: center;
      // justify-content: center;
      // align-items: center;
      .full-screen-container-content-main-core {
        // border: 3px solid green;
        height: 93%;
        width: 90%;
        margin-bottom: 15px;
        overflow: scroll;
        .logo {
          width: 200px;
          margin-top: 10px;
        }
        .full-screen-container-content-main-desc {
          font-size: 15px;
          color: #fff;
          text-align: left;
          padding: 10px 40px;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
