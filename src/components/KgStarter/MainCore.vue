<template>
  <div :class="$style['game-container']">
    <!-- <screen></screen> -->
    <full-screen></full-screen>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import Screen from "./Screen.vue";
import FullScreen from "./FullScreen.vue";

let bodyDOM;
nextTick(() => {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#f3d789";
});
</script>
<style lang="scss" module>
.game-container {
  // background: #f3d789;
  // height: calc(100vh -72px);
  width: 100%;
}
</style>
