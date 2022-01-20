<template>
  <div
    class="nft-blind-box-item"
    :class="$style['nft-blind-box-item']"
    v-if="baseData"
    :set="
      ((type = baseData.type),
      (boxToken = baseData.boxToken),
      (nftMeta = baseData.nftMeta))
    "
  >
    <div :class="$style['img-box']" @click="watchDetail">
      <img
        :src="baseData.icon"
        alt=""
        width="100%"
        v-unsold-nft-url="{
          isUnSoldNft: baseData.isUnSoldNft || false,
          url: baseData.icon || '',
        }"
      />
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { defineProps, reactive, computed, defineEmits } from "vue";
import { useStore } from "vuex";
import StarButton from "@StarUI/StarButton.vue";
import Confirm from "@components/NFT/Confirm";
import utilsFormat from "@utils/format";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarAmount from "@StarUI/StarAmount";
import NftCardItemToolTip from "./NFTCardItemToolTip.vue";
const store = useStore();
const props = defineProps({
  cardType: {
    type: String,
    default: "", //back平台回购，market 市场 collection 收藏 ,conllectionSell 未出售
  },
  sellType: {
    type: String,
    default: "sell",
  },
  baseData: {
    type: Object,
  },
  contentText: {
    type: String,
    default: "",
  },
  hasBtn: {
    type: Boolean,
    default: true,
  },
});
let state = reactive({
  isShowConfirm: computed(
    () => store.state.StoreNftMarket.change_confirm_visible
  ),
  pic: require("../../assets/nft/confirm-logo.png"),
  icon: require("../../assets/nft/blindbox.png"),
  contentText: "",
});

const formatPriceWithLength = (price) => {
  const t = utilsFormat.formatPrice(price, 9, { grouped: false });
  if (t && t.length > 3) {
    return t.slice(0, 3) + "...";
  }
  return t;
};

const showSplitIcon = (type) => {
  return type === "composite_card" || type === "composite_element";
};

const handleConfirm = () => {
  store.commit("StoreNftMarket/CHANGE_CONFIRM_VISIBLE", false);
};
const handleClose = () => {
  store.commit("StoreNftMarket/CHANGE_CONFIRM_VISIBLE", false);
};
const emits = defineEmits(["watchDetail", "actionsCall"]);
const watchDetail = () => {
  // 卡片的信息
  const card_detail = {};
  emits("watchDetail", card_detail);
};
const actionsCall = (action) => {
  emits("actionsCall", { action: action, baseData: props.baseData });
};
const formatAddress = (string) => {
  return utilsFormat.formatSliceString(string);
};
</script>

<style lang="scss" module>
$border-radius: 16px;
.nft-card-item {
  width: 279px;
  background: $white;
  box-shadow: 0px 8px 16px 0px rgba(223, 205, 185, 0.46), 0px 1px 0px 0px $white;
  border-radius: 16px;
  font-size: 14px;
  user-select: none;
  margin-bottom: 30px;
  padding-bottom: 10px;
  overflow: hidden;
  margin-right: 20px;
  &:hover {
    box-shadow: 0 18px 32px -18px #000 !important;
    transform: translateY(-3px);
  }
  .img-box {
    width: 279px;
    height: 279px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-bottom: 0.5px solid #d1d1d1;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
  img {
    cursor: pointer;
    max-width: 279px;
    max-height: 279px;
    width: 100%;
    height: 100%;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }
}
</style>
