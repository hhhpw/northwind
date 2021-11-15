<template>
  <div :class="$style['container-farm-liquidity-detail']">
    <list-header></list-header>
    <liquidity-detail></liquidity-detail>
  </div>
</template>
<script setup>
import ListHeader from "@components/Farms/FarmLiquidity/header";
import LiquidityDetail from "@components/Farms/FarmLiquidity/liquiditydetail";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("StoreFarms/getSwapMiningDrawGas");
</script>
<style lang="scss" module>
.container-farm-liquidity-detail {
  width: 1000px;
  margin: 0px auto;
  margin-top: 25px;
  overflow: hidden;
}
</style>
