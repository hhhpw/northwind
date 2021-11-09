<template>
  <div :class="$style['container-total-data']">
    <div :class="$style['container-total-data-content']">
      <div
        :class="$style['container-total-data-content-item']"
        v-for="(d, i) in state.swapTotalData"
        :key="i"
      >
        <p :class="$style['container-total-data-content-item-title']">
          {{ $t(`farms.farm-swap-total-${i + 1}`) }}
        </p>
        <star-amount
          v-if="d"
          :value="d"
          displayPreFix="$"
          :class="$style['container-total-data-content-item-amount']"
          :formatOptions="{
            precision: i === 3 ? 4 : 2,
            trailingZero: false,
          }"
        ></star-amount>
        <p v-else>- -</p>
      </div>
    </div>
    <star-space :size="20"></star-space>

    <p>* {{ $t("farms.farm-swap-total-data-desc-1") }}</p>
    <p>* {{ $t("farms.farm-swap-total-data-desc-2") }}</p>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, reactive, watch } from "vue";
import StarAmount from "@StarUI/StarAmount";
import StarSpace from "@StarUI/StarSpace";
import { useStore } from "vuex";
let store = useStore();
let state = reactive({
  swapTotalData: computed(() => store.state.StoreFarms.swapTotalData),
  accounts: computed(() => store.state.StoreWallet.accounts),
});

if (state.accounts && state.accounts[0]) {
  store.dispatch("StoreFarms/getTradingMarket", state.accounts[0]);
}

watch(
  () => state.accounts,
  (n) => {
    if (n && n[0]) {
      store.dispatch("StoreFarms/getTradingMarket", n[0]);
    }
  }
);
</script>
<style lang="scss" module>
.container-total-data {
  padding: 10px 20px 20px;
  // width: 500px;
  color: #391b0f;
  background: #f9efe4;
  font-size: 14px;
  border-radius: 16px;
  .container-total-data-content {
    overflow: hidden;
    padding-top: 10px;
    .container-total-data-content-item {
      // display: flex;
      float: left;
      width: 50%;
      margin-top: 10px;
      .container-total-data-content-item-title {
        margin-bottom: 3px;
      }
      .container-total-data-content-item-amount {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>
