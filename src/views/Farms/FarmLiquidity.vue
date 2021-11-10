<template>
  <div :class="$style['container-liquidity-swap']">
    <list-header></list-header>
    <list-liquidity></list-liquidity>
  </div>
</template>
<script setup>
import ListHeader from "@components/Farms/FarmLiquidity/header";
import ListLiquidity from "@components/Farms/FarmLiquidity/list";
</script>
<style lang="scss" module>
.container-liquidity-swap {
  width: 1000px;
  margin: 0px auto;
  margin-top: 25px;
  overflow: hidden;
}
</style>
