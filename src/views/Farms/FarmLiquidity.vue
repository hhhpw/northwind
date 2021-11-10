<template>
  <div :class="$style['container-liquidity-swap']">
    <list-header></list-header>
  </div>
</template>
<script setup>
import ListHeader from "@components/Farms/FarmLiquidity/header.vue";
</script>
<style lang="scss" module>
.container-liquidity-swap {
  width: 1000px;
  margin: 0px auto;
  margin-top: 25px;
  overflow: hidden;
}
</style>
