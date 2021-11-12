<template>
  <div :class="$style['container-detail']">
    <div>{{ state.lpTokenInfo }}</div>
    <liquidity-detail-card
      @kikoDraw="store.dispatch('StoreFarms/drawLiquidityKIKOProfit')"
    ></liquidity-detail-card>
    <liquidity-detail-card
      :lpToken="true"
      @lpTokenDraw="store.dispatch('StoreFarms/drawLiquidityLPToken')"
      :params="state.lpTokenInfo"
    ></liquidity-detail-card>
  </div>
  <input-dialog
    :dialogParams="state.inputDialogParams"
    :dataParams="state.lpTokenInfo"
    @handleCancel="handleCancelInputDialog"
  ></input-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import LiquidityDetailCard from "./card";
import InputDialog from "./inputdialog";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import utilsRouter from "@utils/router";
const token = utilsRouter.getCurrentRoute()?.query?.token;

const store = useStore();
let state = reactive({
  inputDialogParams: computed(() => store.state.StoreFarms.inputDialogParams),
  accounts: computed(() => store.state.StoreWallet.accounts),
  lpTokenInfo: computed(() => store.state.StoreFarms.lpTokenInfo),
});

const handleCancelInputDialog = () => {
  store.commit("StoreFarms/CHANGE_INPUT_DIALOG_PARAMS", {
    dialogVisible: false,
  });
};

// watchEffect(() => {
//   console.log("accounts", state.accounts, token);
//   if (state.accounts && state.accounts[0] && token) {
//     console.log("asdasd");
//     store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", { token });
//     store.dispatch("StoreFarms/getLPDataByUser", state.accounts[0]);
//   }
// });

const onceWatch = watchEffect(() => {
  if (state.accounts && state.accounts[0] && token) {
    store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", { token });
    store.dispatch("StoreFarms/getLPDataByUser", state.accounts[0]);
    onceWatch && onceWatch();
  }
});
</script>
<style lang="scss" module>
.container-detail {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}
</style>
