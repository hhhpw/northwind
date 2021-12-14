<template>
  <div :class="$style['screen-data-container']">
    <p :class="$style['screen-data-container-title']">IGOs</p>
    <div>dasds</div>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <p style="color: red">Slide 1</p>
      </swiper-slide>
      <swiper-slide>
        <p style="color: red">Slide 2</p>
      </swiper-slide>
      <swiper-slide>
        <p style="color: red">Slide 3</p>
      </swiper-slide>
      <swiper-slide>
        <p style="color: red">Slide 4</p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
/* eslint-disable */
// Import Swiper Vue.js components

import { computed, onMounted, reactive, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
// import "swiper/swiper.min.css";
// swiper bundle styles
// import "swiper/css/bundle";
// swiper core styles
// import "swiper/css";

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>
<style lang="scss" module>
.screen-data-container {
  background-image: url("../../assets/igo/kg-content-main.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  .screen-data-container-title {
    color: #fec944;
    font-size: 20px;
    font-weight: bolder;
    margin-top: 20px;
  }
}
</style>
