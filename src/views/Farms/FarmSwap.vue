<template>
  <div :class="$style['container-farm-swap']">
    <div :class="$style['container-farm-swap-header']">
      <total-value
        :class="$style['container-farm-swap-header-item']"
      ></total-value>
      <person-value
        :class="$style['container-farm-swap-header-item']"
      ></person-value>
    </div>
    <swap-core :class="$style['container-farm-swap-core']"></swap-core>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import TotalValue from "@components/Farms/FarmSwap/totaldata";
import PersonValue from "@components/Farms/FarmSwap/persondata";
import SwapCore from "@components/Farms/FarmSwap/swapcore";
</script>
<style lang="scss" module>
.container-farm-swap {
  width: 1100px;
  margin: 0px auto;
  margin-top: 25px;
  // background: #fff;
  overflow: hidden;
  .container-farm-swap-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .container-farm-swap-header-item {
      float: left;
      flex: 1.5;
      &:nth-child(2) {
        flex: 1;
        margin-left: 15px;
      }
    }
  }
  .container-farm-swap-core {
    margin-top: 60px;
    // padding: 0 0;
  }
  // height: 200px;
}
</style>
