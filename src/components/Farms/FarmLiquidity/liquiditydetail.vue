<template>
  <div :class="$style['container-detail']">
    <liquidity-detail-card></liquidity-detail-card>
    <liquidity-detail-card :lpToken="true"></liquidity-detail-card>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import LiquidityDetailCard from "./card";
</script>
<style lang="scss" module>
.container-detail {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}
</style>
