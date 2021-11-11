<template>
  <div :class="$style['container-detail']">
    <liquidity-detail-card
      @kikoDraw="store.dispatch('StoreFarms/drawLiquidityKIKOProfit')"
    ></liquidity-detail-card>
    <liquidity-detail-card
      :lpToken="true"
      @lpTokenDraw="store.dispatch('StoreFarms/drawLiquidityLPToken')"
    ></liquidity-detail-card>
  </div>
  <input-dialog :dialogParams="state.inputDialogParams"></input-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import LiquidityDetailCard from "./card";
import InputDialog from "./inputdialog";
import { useStore } from "vuex";
const store = useStore();
let state = reactive({
  inputDialogParams: computed(() => store.state.StoreFarms.inputDialogParams),
  accounts: computed(() => store.state.StoreWallet.accounts),
});
if (state.accounts && state.accounts[0]) {
  store.dispatch("StoreFarms/getAllPoolListByUser", state.accounts[0]);
}
watch(
  () => state.accounts,
  (n) => {
    if (n && n[0]) {
      store.dispatch("StoreFarms/getAllPoolListByUser", n[0]);
    }
  }
);
</script>
<style lang="scss" module>
.container-detail {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}
</style>
