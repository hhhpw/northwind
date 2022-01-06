<template>
  <div :class="$style['hero-card']"></div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
</script>
<style lang="scss" module>
.hero-card {
  width: 600px;
  height: 600px;
  // border: 1px solid red;
  background-image: url("../../assets/metaverse/left-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>
