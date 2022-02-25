<template>
  <star-nft
    class="blind-box-container"
    :coreType="state.coreType"
    v-if="state.walletStatus === 'connected'"
    :cardTypeParams="{ minHeight: '800px' }"
  >
    <template #nft-card>
      <div v-if="state.detail_info">
        <detailCard
          :detailData="state.detail_info"
          :action_type="state.action_type"
          :blind_box_type="state.detail_type"
          :isNFT="state.blind_box_type !== 'box'"
          :isOnSell="state.detail_info.onSell"
          :isOwner="isOwner(state.detail_info.address)"
          @actionsCall="actionsCall"
          fromView="collection"
        ></detailCard>
      </div>
      <star-loading-fish v-else></star-loading-fish>
    </template>
  </star-nft>

  <nft-dialog
    :dialogVisible="state.dialogEvent && state.dialogParams.isShow"
    :isShowClose="!(state.dialogParams.dialogStatus === 'ongoing')"
    :dialogParams="state.dialogParams"
    @handleClose="
      state.dialogEvent &&
        state.dialogEvent.handleClose(state.dialogParams.dialogStatus)
    "
    @handleSuccess="state.dialogEvent && state.dialogEvent.handleSuccess()"
    @handleFailed="state.dialogEvent && state.dialogEvent.handleFailed()"
  >
  </nft-dialog>

  <nft-second-dialog
    :dialogVisible="state.secondDialogParams.isShow"
    :dialogParams="state.secondDialogParams"
    @handleClose="secondDialogClose"
    @handleCancel="secondDialogClose"
    @handleConfirm="sencondDialogConfirm"
  >
  </nft-second-dialog>
  <nft-bid-dialog
    :dialogVisible="state.bidPriceDialogParams.isShow"
    :dialogParams="state.bidPriceDialogParams"
    @handleClose="bidPriceDialogClose"
    @handleCancel="bidPriceDialogClose"
    @handleConfirm="bidPricConfirm"
  >
  </nft-bid-dialog>

  <nft-sold-out-dialog
    :dialogVisible="state.soldDialogParams.isShow"
    :dialogParams="state.soldDialogParams"
    @handleClose="handleSoldOutCloseFunc"
    @handleConfirm="handleSoldOutConfirmFunc"
  >
  </nft-sold-out-dialog>
</template>
<script setup>
/* eslint-disable */
import {
  reactive,
  computed,
  onMounted,
  ref,
  watchEffect,
  onUnmounted,
  watch,
} from "vue";
import StarNft from "@StarUI/StarNFT.vue";
import StarLoadingFish from "@StarUI/StarLoadingFish.vue";
// import DetailCard from "@components/NFT/DetailCard.vue";
import detailCard from "@components/NFT/Details.vue";
import utilsNumber from "@utils/number";
import utilsRegexp from "@utils/regexp";
import NftDialog from "@components/NFT/NFTDialog.vue";
import NftSecondDialog from "@components/NFT/NFTSecondDialog.vue";
import NftBidDialog from "@components/NFT/DetailsUI/NFTBidDialog.vue";
import NftSoldOutDialog from "@components/NFT/NFTSoldOutDialog.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { dialogEventMaps } from "./dialog";
import utilsFormat from "@utils/format";
import StarButton from "@StarUI/StarButton.vue";
import StarConfirm from "@StarUI/StarConfirm";
import StarInputNumber from "@StarUI/StarInputNumber";
import StarSpace from "@StarUI/StarSpace.vue";
import NFT_CONSTANTS from "@constants/nft.js";
const { t } = useI18n();
const route = useRoute();
const store = useStore();

const handleSoldOutCloseFunc = () => {
  window.location.reload();
};

const handleSoldOutConfirmFunc = () => {
  window.location.reload();
};

let state = reactive({
  timer: null,
  coreType: "card",
  isTab: false,
  cTypeArgs: "", // 区分二次弹窗的来源
  isShowConfirm: false, // 是否出现弹窗
  dialogEvent: null,
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
  detail_info: computed(() => store.state.StoreCollection.detail_info),
  detail_type: computed(() => store.state.StoreCollection.detail_type),
  soldDialogParams: computed(
    () => store.state.StoreCollection.soldDialogParams
  ),
  secondDialogParams: computed(
    () => store.state.StoreCollection.secondDialogParams
  ),
  dialogParams: computed(() => store.state.StoreCollection.dialogParams),
  /* eslint-disable-next-line  */
  action_type: computed(() => {
    const type = ref(route.query.sellType).value;
    if (type === "unsold") {
      return "UNSOLD";
    } else if (type === "selling") {
      return "OWNERSELL";
    }
  }),
  bidPriceDialogParams: NFT_CONSTANTS.BID_PRICE_DIALOD_PARAMS,
  action_call_type: "",
});

let editState = reactive({
  edit_price_inputVal: 1,
  edit_price_show: false, // 修改报价弹窗
  edit_price_error: false,
  edit_price_isInteger: true,
});

watchEffect(() => {
  if (state.detail_info && editState.edit_price_show) {
    editState.edit_price_inputVal = Number(
      utilsFormat.formatBalance(state.detail_info.sellingPrice || 0, 9)
    );
  }
});
const isOwner = (address) =>
  computed(() => {
    if (store.state.StoreWallet.accounts?.[0]) {
      return address === store.state.StoreWallet.accounts?.[0];
    }
  });

onMounted(() => {
  store.commit(
    "StoreCollection/CHANGE_SECOND_DIALOG_STATUS",
    NFT_CONSTANTS.INIT_SECOND_DIALOG_PARAMS
  );
  store.commit(
    "StoreCollection/CHANGE_DIALOG_STATUS",
    NFT_CONSTANTS.INIT_DIALOG_PARAMS
  );
  const infoId = ref(route.query.infoId).value;
  const groupId = ref(route.query.groupId).value;
  const sellType = ref(route.query.sellType).value;
  const boxToken = ref(route.query.boxToken).value;
  const nftId = ref(route.query.nftId).value;
  const nftMeta = ref(route.query.nftMeta).value;
  const nftBody = ref(route.query.nftBody).value;
  const payToken = ref(route.query.payToken).value;
  const chainId = ref(route.query.chainId).value;

  if (sellType === "selling") {
    if (infoId) {
      store.dispatch("StoreCollection/getSellingNftDetail", infoId);
    }
    if (groupId && chainId) {
      store.dispatch("StoreCollection/getSellingBoxDetail", {
        groupId,
        chainId,
      });
    }
  } else if (sellType === "unsold") {
    if (boxToken && payToken) {
      store.dispatch("StoreCollection/getBoxDetail", {
        boxToken,
        payToken,
        type: "detail",
      });
    } else {
      store.dispatch("StoreCollection/getNftDetail", {
        nftId: nftId,
        nftMeta: nftMeta,
        nftBody: nftBody,
        payToken: payToken,
      });
    }
  }
});

onUnmounted(() => {
  store.commit("StoreCollection/SET_DETAIL_INFO", null);
  store.commit("StoreCollection/SET_DETAIL_TYPE", null);
});

const checkEditValue = (value) => {
  if (
    utilsNumber
      .bigNum(value)
      .lte(
        utilsNumber
          .bigNum(state.detail_info.topBidPrice || 0)
          .div(Math.pow(10, 9))
      )
  ) {
    editState.edit_price_error = true;
    return false;
  }
  return true;
};

const editInputEvent = (e) => {
  editState.edit_price_isInteger = true;
  editState.edit_price_error = false;
  editState.edit_price_inputVal = Number(e);
};

const actionsCall = async (d) => {
  state.action_call_type = d.action;
  state.cTypeArgs = "";
  if (d.action === "AcceptBid") {
    if (
      !state.detail_info.topBidPrice ||
      Number(state.detail_info.topBidPrice) <= 0
    ) {
      return;
    }
    const price = utilsFormat.formatPrice(state.detail_info.topBidPrice);
    const currency = utilsFormat.getTokenCurrency(state.detail_info.payToken);
    store.commit("StoreCollection/CHANGE_SECOND_DIALOG_STATUS", {
      isShow: true,
      imgUrl: state.detail_info.imageLink || state.detail_info.boxTokenLogo,
      text: t("确认报价", {
        price,
        currency,
      }),
      gasInfo: t("NFT手续费", {
        currency,
        gasAmount: utilsNumber
          .bigNum(price)
          .times(NFT_CONSTANTS.NFT_GAS_FEE)
          .toString(),
      }),
    });
  } else if (d.action === "SellNFT" || d.action === "SellBlinkBox") {
    state.bidPriceDialogParams = Object.assign(
      {},
      NFT_CONSTANTS.BID_PRICE_DIALOD_PARAMS,
      {
        isShow: true,
      }
    );
    // if (!state.detail_info.sellingPrice) return;
    // if (utilsNumber.bigNum(state.detail_info.sellingPrice).gt(0)) {
    //   const price = utilsNumber
    //     .bigNum(String(state.detail_info.sellingPrice))
    //     .times(Math.pow(10, 9))
    //     .toString();
    //   let params;
    //   if (state.detail_type === "box") {
    //     params = {
    //       tyArgs: [state.detail_info.boxToken, state.detail_info.payToken],
    //       args: [price],
    //       type: "box",
    //       groupId: ref(route.query.groupId).value,
    //       chainId: ref(route.query.chainId).value,
    //     };
    //   } else {
    //     params = {
    //       tyArgs: [
    //         state.detail_info.nftMeta,
    //         state.detail_info.nftBody,
    //         state.detail_info.payToken,
    //       ],
    //       args: [String(state.detail_info.nftId), String(price)],
    //       type: "nft",
    //       infoId: ref(route.query.infoId).value,
    //     };
    //   }
    //   state.dialogEvent = dialogEventMaps["Sell"];
    //   store.dispatch("StoreCollection/sellContractsCall", params);
    // }
  } else if (d.action === "OpenBlinkBox") {
    state.dialogEvent = dialogEventMaps["OpenBlinkBox"];
    store.dispatch("StoreCollection/openBlindBoxCall", {
      boxImg: require("../../../assets/nft/blindbox.png"),
      //  state.detail_info.boxTokenLogo,
      boxTokenArr: state.detail_info.boxToken.split("::"),
      nftMeta: state.detail_info.nftMeta,
      nftBody: state.detail_info.nftBody,
    });
  } else if (d.action === "CancelSell") {
    state.dialogEvent = dialogEventMaps["CancelSell"];
    let params;
    if (state.detail_type === "box") {
      params = {
        type: "box",
        tyArgs: [state.detail_info.boxToken, state.detail_info.payToken],
        args: [ref(route.query.chainId).value],
        groupId: ref(route.query.groupId).value,
        chainId: ref(route.query.chainId).value,
      };
    } else {
      params = {
        type: "nft",
        tyArgs: [
          state.detail_info.nftMeta,
          state.detail_info.nftBody,
          state.detail_info.payToken,
        ],
        args: [state.detail_info.nftId],
        infoId: ref(route.query.infoId).value,
      };
    }
    store.dispatch("StoreCollection/cancelSellContractsCall", params);
  } else if (d.action === "UpdateBid") {
    editState.edit_price_show = true;
  }
};

// 二次弹窗
const secondDialogClose = () => {
  store.commit(
    "StoreCollection/CHANGE_SECOND_DIALOG_STATUS",
    NFT_CONSTANTS.INIT_SECOND_DIALOG_PARAMS
  );
};

const bidPriceDialogClose = () => {
  state.bidPriceDialogParams = NFT_CONSTANTS.BID_PRICE_DIALOD_PARAMS;
};

const sencondDialogConfirm = () => {
  if (!state.action_call_type) return;
  if (state.action_call_type === "AcceptBid") {
    state.dialogEvent = dialogEventMaps["AcceptBid"];
    let price = utilsFormat.formatPrice(state.detail_info.topBidPrice);
    const gap = 1 - NFT_CONSTANTS.NFT_GAS_FEE;
    price = utilsNumber.bigNum(price).times(gap).toString();
    let params = {
      price,
      currency: utilsFormat.getTokenCurrency(state.detail_info.payToken),
    };
    if (state.detail_type === "box") {
      params = Object.assign({}, params, {
        type: "box",
        tyArgs: [state.detail_info.boxToken, state.detail_info.payToken],
        args: [ref(route.query.chainId).value],
        groupId: ref(route.query.groupId).value,
        chainId: ref(route.query.chainId).value,
      });
    } else {
      params = Object.assign({}, params, {
        type: "nft",
        tyArgs: [
          state.detail_info.nftMeta,
          state.detail_info.nftBody,
          state.detail_info.payToken,
        ],
        args: [state.detail_info.nftId],
        infoId: ref(route.query.infoId).value,
      });
    }
    secondDialogClose();
    store.dispatch("StoreCollection/acceptBidContractsCall", params);
  }
};

const bidPricConfirm = (objs) => {
  let params = {};
  state.dialogEvent = dialogEventMaps["bidPriceSell"];
  let price = utilsNumber.bigNum(objs.price).times(Math.pow(10, 9)).toString();
  if (objs["type"] === 0) {
    params = Object.assign(
      {},
      {
        tyArgs: [
          "0x69f1e543a3bef043b63bed825fcd2cf6::BatchMintNFT::KikoCatBox",
          state.detail_info.payToken,
        ],
        args: [price],
        sellType: 0,
      }
    );
  } else {
    params = Object.assign(
      {},
      {
        tyArgs: [
          "0x69f1e543a3bef043b63bed825fcd2cf6::BatchMintNFT::KikoCatBox",
          state.detail_info.payToken,
        ],
        args: [price, objs.end_day],
        sellType: 1,
      }
    );
  }
  store.dispatch("StoreCollection/sellPrice", params);
};
</script>
<style lang="scss" scoped>
.blind-box-container {
  margin: 0 auto;
  padding-bottom: 30px;
  .star-nft {
    .nft-card-core {
      min-height: 600px;
    }
  }
}
.error {
  text-align: right;
  margin-top: 3px;
  font-size: 12px;
  text-align: right;
  color: #f36346;
}
</style>
