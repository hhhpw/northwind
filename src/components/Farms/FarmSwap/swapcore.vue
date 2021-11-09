<template>
  <div :class="$style['container-swap-core']">
    <section>
      <p>{{ $t("farms.farm-swap-pool-title") }}</p>
      <p>{{ $t("farms.farm-swap-pool-title-desc") }}</p>
    </section>
    <template v-if="state.swapPoolList">
      <div :class="$style['container-swap-core-content']">
        <swap-pool-card
          v-for="(d, i) in state.swapPoolList"
          :key="i"
          :data="d"
        ></swap-pool-card>
      </div>
    </template>
  </div>
</template>
<script setup>
/* eslint-disable */
import {
  computed,
  onMounted,
  reactive,
  defineProps,
  defineEmits,
  watch,
} from "vue";
import SwapPoolCard from "./swapoolcard.vue";
import { useStore } from "vuex";
const store = useStore();
let state = reactive({
  swapPoolList: computed(() => store.state.StoreFarms.swapPoolList),
  accounts: computed(() => store.state.StoreWallet.accounts),
});
if (state.accounts && state.accounts[0]) {
  store.dispatch("StoreFarms/getTradingPoolList", state.accounts[0]);
}
watch(
  () => state.accounts,
  (n) => {
    if (n && n[0]) {
      store.dispatch("StoreFarms/getTradingPoolList", n[0]);
    }
  }
);
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
