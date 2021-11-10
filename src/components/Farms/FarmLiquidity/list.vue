<template>
  <div :class="$style['container-farm-liquidity-list']">
    <div :class="$style['container-farm-liquidity-list-ths']">
      <div
        :class="$style['container-farm-liquidity-list-ths-item']"
        v-for="(d, i) in new Array(6)"
        :key="i"
      >
        {{ $t("farms.") }}
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";

let state = reactive({});
</script>
<style lang="scss" module></style>
