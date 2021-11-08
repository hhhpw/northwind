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
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import TotalValue from "@components/Farms/FarmSwap/totaldata";
import PersonValue from "@components/Farms/FarmSwap/persondata";
</script>
<style lang="scss" module>
.container-farm-swap {
  width: 1100px;
  margin: 0px auto;
  margin-top: 40px;
  background: #fff;
  overflow: hidden;
  .container-farm-swap-header {
    width: 100%;
    // display: flex;
    // overflow: hidden;
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
  // height: 200px;
}
</style>
