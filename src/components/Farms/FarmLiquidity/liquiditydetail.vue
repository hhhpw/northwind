<template>
  <div>
    <div :class="$style['container-detail-box']">
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
            store.dispatch('StoreFarms/canDrawProfit', {
              type: 'liquiditykiko',
            })
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

    <p
      :class="$style['container-detail-text']"
      v-if="state.lpTokenInfo?.token"
      @click="pushLPTokenSelect"
    >
      {{
        $t("farms.farm-liquidity-detail-lp-text", {
          token: state.lpTokenInfo?.token.replace("_", "/"),
        })
      }}
    </p>
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
import { computed, onUnmounted, reactive, watchEffect } from "vue";
import LiquidityDetailCard from "./card";
import InputDialog from "./inputdialog";
import { useStore } from "vuex";
import utilsRouter from "@utils/router";
import FarmSecondDialog from "../farmseconddialog";
import FarmDialog from "../farmdialog";
import FARMS_CONSTANTS from "@constants/farms";
import utilsTool from "@utils/tool";
import { dialogEventMaps } from "../dialog.js";

const token = utilsTool.decodeQueryURL(
  utilsRouter.getCurrentRoute()?.query?.token
);
const tokenAddress = utilsTool.decodeQueryURL(
  utilsRouter.getCurrentRoute()?.query?.tokenAddress
);

const poolId = utilsTool.decodeQueryURL(
  utilsRouter.getCurrentRoute()?.query?.id
);
const store = useStore();
let state = reactive({
  liquidityDrawData: computed(() => store.state.StoreFarms.liquidityDrawData),
  inputDialogParams: computed(() => store.state.StoreFarms.inputDialogParams),
  accounts: computed(() => store.state.StoreWallet.accounts),
  lpTokenInfo: computed(() => store.state.StoreFarms.lpTokenInfo),
  secondDialogParams: computed(() => store.state.StoreFarms.secondDialogParams),
  dialogParams: computed(() => store.state.StoreFarms.dialogParams),
  currencyList: computed(() => store.state.StoreCommon.currencyList),
});

store.dispatch("StoreFarms/getSwapMiningDrawGas");

const onceWatch = watchEffect(() => {
  if (token) {
    store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", { token });
  }
  if (state.accounts && state.accounts[0] && token) {
    store.dispatch("StoreFarms/getLPDataByUser", state.accounts[0]);
    store.dispatch("StoreFarms/getLiquidityKikoReward", {
      userAddress: state.accounts[0],
      poolId,
    });
    onceWatch && onceWatch();
  }
});

const handleCancelInputDialog = () => {
  store.commit(
    "StoreFarms/CHANGE_INPUT_DIALOG_PARAMS",
    FARMS_CONSTANTS.LIQUIDITY_INPUT_DIALOG_PARAMS
  );
};

const pushLPTokenSelect = () => {
  if (!tokenAddress) return;
  const address = tokenAddress.split("___");
  const tokenAInfo = state.currencyList.filter(
    (d) => d.address === address[0]
  )[0];
  const tokenBInfo = state.currencyList.filter(
    (d) => d.address === address[1]
  )[0];
  let params = [];
  [tokenAInfo, tokenBInfo].forEach((item, i) => {
    const { shortName, icon, address, exchangePrecision, displayPrecision } =
      item;
    const obj = Object.assign(
      {},
      {
        currency: shortName,
        icon,
        token: address,
        exchangePrecision,
        displayPrecision,
      },
      { type: i === 0 ? "from" : "to" }
    );
    params[i] = obj;
  });
  store.commit("StoreLiquidity/CHANGE_POOL_TYPE", "add");
  store.dispatch("StoreLiquidity/setSelectCurrencyInfo", params[0]);
  store.dispatch("StoreLiquidity/setSelectCurrencyInfo", params[1]);
  utilsRouter.push({
    path: "/liquidity",
  });
};

onUnmounted(() => {
  store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", {
    token: "",
    value: "",
    tokenAddress: "",
  });
});
</script>
<style lang="scss" module>
.container-detail-box {
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
}
.container-detail-text {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #fb8000;
  text-decoration: underline;
  cursor: pointer;
}
</style>
