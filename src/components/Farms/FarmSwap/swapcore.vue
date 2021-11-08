<template>
  <div :class="$style['container-swap-core']">
    <section>
      <p>{{ $t("farms.farm-swap-pool-title") }}</p>
      <p>{{ $t("farms.farm-swap-pool-title-desc") }}</p>
    </section>
    <div :class="$style['container-swap-core-content']">
      <swap-pool-card></swap-pool-card>
      <swap-pool-card></swap-pool-card>
      <swap-pool-card></swap-pool-card>
      <swap-pool-card></swap-pool-card>
      <swap-pool-card></swap-pool-card>
      <swap-pool-card></swap-pool-card>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import SwapPoolCard from "./swapoolcard.vue";
</script>
<style lang="scss" module>
.container-swap-core {
  color: #391b0f;
  font-size: 14px;
  section {
    p:nth-child(1) {
      font-size: 24px;
      margin-bottom: 3px;
    }
  }
  .container-swap-core-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 80px;
    padding-top: 50px;
  }
}
</style>
