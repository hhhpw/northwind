<template>
  <div :class="$style['container-detail']">
    <liquidity-detail-card
      :params="
        Object.assign(
          {},
          {
            value: state.liquidityDrawData,
          }
        )
      "
      @kikoDraw="
        () =>
          store.dispatch('StoreFarms/canDrawProfit', { type: 'liquiditykiko' })
      "
    ></liquidity-detail-card>
    <liquidity-detail-card
      :lpToken="true"
      @lpTokenDraw="
        () => store.dispatch('StoreFarms/showLiquidityDialog', 'draw')
      "
      @addLpToken="
        () => store.dispatch('StoreFarms/showLiquidityDialog', 'add')
      "
      :params="state.lpTokenInfo"
    ></liquidity-detail-card>
  </div>
  <input-dialog
    :dialogParams="state.inputDialogParams"
    :dataParams="state.lpTokenInfo"
    @handleCancel="handleCancelInputDialog"
    @handleConfirm="
      ($event) =>
        store.dispatch('StoreFarms/liquidityContracts', { type: $event })
    "
  ></input-dialog>

  <farm-dialog
    :dialogParams="state.dialogParams"
    @handleClose="
      () =>
        dialogEventMaps &&
        dialogEventMaps.swapDialog.handleClose(
          state.dialogParams && state.dialogParams.dialogStatus
        )
    "
    @handleSuccess="
      () => dialogEventMaps && dialogEventMaps.swapDialog.handleSuccess()
    "
    @handleFailed="
      () => dialogEventMaps && dialogEventMaps.swapDialog.handleFailed()
    "
  ></farm-dialog>
  <!-- 二次弹窗 -->
  <farm-second-dialog
    :dialogParams="state.secondDialogParams"
    @handleClose="
      () =>
        dialogEventMaps &&
        dialogEventMaps.swapSecondDialog.handleClose(
          state.secondDialogParams && state.secondDialogParams.dialogStatus
        )
    "
    @handleConfirm="
      () =>
        dialogEventMaps &&
        dialogEventMaps.swapSecondDialog.handleSuccess(
          state.secondDialogParams.type
        )
    "
  ></farm-second-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import LiquidityDetailCard from "./card";
import InputDialog from "./inputdialog";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import utilsRouter from "@utils/router";
import FarmSecondDialog from "../farmseconddialog";
import FarmDialog from "../farmdialog";
import FARMS_CONSTANTS from "@constants/farms";
import { dialogEventMaps } from "../dialog.js";

const token = utilsRouter.getCurrentRoute()?.query?.token;

const store = useStore();
let state = reactive({
  liquidityDrawData: computed(() => store.state.StoreFarms.liquidityDrawData),
  inputDialogParams: computed(() => store.state.StoreFarms.inputDialogParams),
  accounts: computed(() => store.state.StoreWallet.accounts),
  lpTokenInfo: computed(() => store.state.StoreFarms.lpTokenInfo),
  secondDialogParams: computed(() => store.state.StoreFarms.secondDialogParams),
  dialogParams: computed(() => store.state.StoreFarms.dialogParams),
});

const handleCancelInputDialog = () => {
  store.commit(
    "StoreFarms/CHANGE_INPUT_DIALOG_PARAMS",
    FARMS_CONSTANTS.LIQUIDITY_INPUT_DIALOG_PARAMS
  );
};

const onceWatch = watchEffect(() => {
  if (token) {
    store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", { token });
  }
  if (state.accounts && state.accounts[0] && token) {
    store.dispatch("StoreFarms/getLPDataByUser", state.accounts[0]);
    store.dispatch("StoreFarms/getLiquidityKikoReward", state.accounts[0]);
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
