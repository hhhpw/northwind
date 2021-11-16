<template>
  <div>
    <div :class="$style['container-person-data']">
      <div :class="$style['container-person-data-header']">
        <div
          :class="$style['container-person-data-header-item']"
          v-for="(d, i) in new Array(2)"
          :key="i"
        >
          <template v-if="i === 0">
            <div
              :class="[
                $style['container-person-data-header-item-block'],
                $style['after-block'],
              ]"
            >
              <!-- 当前挖矿收益kiko -->
              <p>{{ $t("farms.farm-swap-person-title1") }}</p>
              <star-amount
                :class="
                  $style['container-person-data-header-item-block-amount']
                "
                :value="state.swapPersonData[0]"
                :formatOptions="{ precision: 4, trailingZero: false }"
                v-if="
                  state.swapPersonData[0] && state.walletStatus === 'connected'
                "
              >
              </star-amount>
              <p v-else>0.0000</p>
            </div>
            <star-button
              v-if="state.walletStatus === 'connected'"
              type="dark"
              :class="$style['container-person-data-header-item-btn']"
              @click="canDrawProfit('mining')"
              >{{ $t("farms.farm-swap-draw") }}</star-button
            >
          </template>

          <template v-if="i === 1">
            <!-- 七日锁仓kiko -->
            <div :class="$style['container-person-data-header-item-block']">
              <p>{{ $t("farms.farm-swap-person-title2") }}</p>
              <star-amount
                :class="
                  $style['container-person-data-header-item-block-amount']
                "
                :value="state.swapPersonData[1]"
                :formatOptions="{ precision: 4, trailingZero: true }"
                v-if="
                  state.swapPersonData[1] && state.walletStatus === 'connected'
                "
              >
              </star-amount>
              <p v-else>0.0000</p>
              <star-space :size="30"></star-space>
              <p>{{ $t("farms.farm-swap-can-draw") }}</p>
              <star-amount
                :class="
                  $style['container-person-data-header-item-block-amount']
                "
                :value="state.swapPersonData[2]"
                :formatOptions="{ precision: 4, trailingZero: true }"
                v-if="
                  state.swapPersonData[2] && state.walletStatus === 'connected'
                "
              >
              </star-amount>
              <p v-else>0.0000</p>
            </div>
            <star-button
              @click="canDrawProfit('locked')"
              v-if="state.walletStatus === 'connected'"
              type="dark"
              :class="$style['container-person-data-header-item-btn']"
              >{{ $t("farms.farm-swap-draw") }}</star-button
            >
          </template>
        </div>
      </div>
      <star-button
        type="dark"
        :class="$style['connect-wallet-btn']"
        v-if="state.walletStatus !== 'connected'"
        @click="() => connectWallet()"
        >{{ $t("链接钱包") }}
      </star-button>
      <p :class="$style['container-person-data-drawdesc']">
        {{ $t("farms.farm-swap-person-drawdesc") }}
      </p>
    </div>
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
    <!-- loading弹窗 -->
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
      :dataParams="state.dataParams"
    ></farm-dialog>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarButton from "@StarUI/StarButton";
import StarAmount from "@StarUI/StarAmount";
import StarSpace from "@StarUI/StarSpace";
import FarmSecondDialog from "../farmseconddialog";
import FarmDialog from "../farmdialog";
import connectLogic from "@mixins/wallet";
import { useStore } from "vuex";
import FARMS_CONSTANTS from "@constants/farms.js";
import { dialogEventMaps } from "../dialog.js";
let store = useStore();

const { connectWallet } = connectLogic(store);
let state = reactive({
  swapPersonData: computed(() => store.state.StoreFarms.swapPersonData),
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
  secondDialogParams: computed(() => store.state.StoreFarms.secondDialogParams),
  dialogParams: computed(() => store.state.StoreFarms.dialogParams),
  accounts: computed(() => store.state.StoreWallet.accounts),
});

if (state.accounts && state.accounts[0]) {
  store.dispatch("StoreFarms/getTradingReward", state.accounts[0]);
}

watch(
  () => state.accounts,
  (n) => {
    if (n && n[0]) {
      store.dispatch("StoreFarms/getTradingReward", n[0]);
    }
  }
);

const canDrawProfit = (type) => {
  store.dispatch("StoreFarms/canDrawProfit", { type });
};
// const canDrawMiningProfit = () => {
//   store.dispatch("StoreFarms/canDrawMiningProfit");
// };

// const canDrawLockedProfit = () => {
//   store.dispatch("StoreFarms/canDrawLockedProfit");
// };

// const swapDrawLockedProfit = () => {
//   store.dispatch("StoreFarms/swapDrawLockedProfit");
// };
const handleClose = (type) => {
  if (type === "second") {
    store.commit(
      "StoreFarms/CHANGE_SECOND_DIALOG_PARAMS",
      FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS
    );
  }
  if (type === "feedback") {
    store.commit(
      "StoreFarms/CHANGE_DIALOG_PARAMS",
      FARMS_CONSTANTS.SWAP_DIALOG_PARAMS
    );
  }
};
</script>
<style lang="scss" module>
.container-person-data {
  color: #391b0f;
  background: #f9efe4;
  padding: 30px 20px 20px;
  // width: 400px;
  font-size: 14px;
  border-radius: 16px;
  .connect-wallet-btn {
    padding: 8px 20px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
  .container-person-data-header {
    display: flex;
    .container-person-data-header-item {
      flex: 1;
      text-align: center;
      .container-person-data-header-item-block {
        position: relative;
        padding-bottom: 20px;
        &.after-block::after {
          position: absolute;
          content: "";
          width: 1px;
          background: #e8e0da;
          height: 100%;
          right: 0%;
          top: 0;
        }
        .container-person-data-header-item-block-amount {
          margin-top: 3px;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .container-person-data-header-item-btn {
        margin-top: 20px;
        padding: 8px 20px;
      }

      // display: flex;
      // justify-content: center;
      // align-items: center;
      // flex-direction: column;
      // .container-person-data-header-item-block {
      //   border-right: 1px solid red;
      // }
      // .container-person-data-header-item-block-div {
      //   width: 2px;
      //   height: 30px;
      //   background: red;
      //   poa
      // }
    }
  }
  .container-person-data-drawdesc {
    margin-top: 20px;
  }
}
</style>
