<template>
  <div class="home-wrap">
    <first-page v-if="state.showTab == 0"></first-page>
    <second-page v-if="state.showTab == 1"></second-page>
    <third-page v-if="state.showTab == 2"></third-page>
    <four-page v-if="state.showTab == 3"></four-page>
    <five-page v-if="state.showTab == 4"></five-page>
    <six-page v-if="state.showTab == 5"></six-page>
    <seven-page v-if="state.showTab == 6"></seven-page>
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
<style lang="scss" scoped>
.home-wrap {
  width: 100%;
  height: 100%;
}
</style>
