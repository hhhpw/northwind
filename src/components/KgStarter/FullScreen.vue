<template>
  <div :class="$style['full-screen-container']">
    <div :class="$style['full-screen-container-header']">
      <img src="../../assets/igo/header.png" />
    </div>
    <div :class="$style['full-screen-container-content']" ref="bgDOM">
      <div :class="$style['full-screen-container-content-mask']">
        <div :class="$style['full-screen-container-content-main']">
          <div :class="$style['full-screen-container-content-main-core']">
            <img src="../../assets/igo/logo-B.png" :class="$style['logo']" />
            <div :class="$style['full-screen-container-content-main-desc']">
              <p>{{ $t("kgstarter.content") }}</p>
              <p>{{ $t("kgstarter.footer") }}</p>
            </div>
            <screen-data></screen-data>
          </div>
        </div>
      </div>
    </div>
    <!-- 预加载防止闪烁，后续写个方法 -->
    <img src="../../assets/igo/kg-bg-1.jpeg" style="display: none" />
    <img src="../../assets/igo/kg-bg-2.jpeg" style="display: none" />
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import ScreenData from "./ScreenData.vue";
import { ref, nextTick } from "vue";
import { random } from "lodash";
let bgDOM = ref(null);
nextTick(() => {
  const randomBg = (num) => {
    bgDOM.value.style["background-image"] =
      "url(" + require(`../../assets/igo/kg-bg-${num}.jpeg`) + ")";
    num = num === 2 ? 1 : num + 1;
    setTimeout(() => randomBg(num), num === 2 ? 50 : random(1000, 2000));
  };
  randomBg(1);
});
</script>
<style scoped>
/* ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background: none !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background: none !important;
} */
</style>
<style lang="scss" module>
// ::-webkit-scrollbar-track {
//   border-radius: 10px;
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
//   background: rgba(0, 0, 0, 0.7);
// }
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
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
      // background: rgba(0, 0, 0, 0.5);
      background-image: url("../../assets/igo/bg-mask.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
          padding: 10px 28px;
          opacity: 0.8;
          width: 90%;
          margin: 0 auto;
          margin-bottom: 20px;
          box-sizing: border-box;
          p {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
