<template>
  <div class="home-wrap">
    <ElCarousel direction="vertical" :autoplay="false">
      <ElCarouselItem>
        <first-page></first-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <second-page></second-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <third-page></third-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <four-page></four-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <five-page></five-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <six-page></six-page>
      </ElCarouselItem>
      <ElCarouselItem>
        <seven-page></seven-page>
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import FirstPage from "../../components/Home/FirstPage.vue";
import SecondPage from "../../components/Home/SecondPage.vue";
import ThirdPage from "../../components/Home/ThirdPage.vue";
import FourPage from "../../components/Home/FourPage.vue";
import FivePage from "../../components/Home/FivePage.vue";
import SixPage from "../../components/Home/SixPage.vue";
import SevenPage from "../../components/Home/SevenPage.vue";

let state = reactive({
  showTab: 6,
});
</script>
<style>
.home-wrap .el-carousel {
  height: 100%;
}
.home-wrap .el-carousel .el-carousel__container {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home-wrap {
  width: 100%;
  height: 100%;
}
</style>
