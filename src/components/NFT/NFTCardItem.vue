<template>
  <div
    class="nft-card-item"
    :class="$style['nft-card-item']"
    v-if="props.baseData"
    :set="
      ((itemData = props.baseData),
      (boxToken = itemData.boxToken),
      (nftMeta = itemData.nftMeta),
      (payToken = utilsFormat.getTokenCurrency(itemData.payToken)),
      (offerPriceStyle = getOfferPriceStyle('b')),
      (t = getCountDown(1644400786000)))
    "
  >
    <div :class="$style['img-box']" @click="watchDetail">
      <div
        :class="$style['countdown-box']"
        v-if="showCountDown(props.cardType, state.countdown, props.sellType)"
      >
        <svg-icon
          name="clock"
          style="margin-right: 3px; font-size: 16px"
        ></svg-icon>
        <span>{{ state.countdown }}</span>
      </div>
      <!-- v-unsold-nft-url="{
          isUnSoldNft: itemData.isUnSoldNft || false,
          url: itemData.icon || '',
        }" -->
      <img :src="itemData.icon" alt="" width="100%" />
    </div>
    <div :class="$style['item-content']">
      <div :class="$style['item-content-info']">
        <div :class="$style['item-content-info-data']">
          <span :class="$style['item-content-info-data-name']">{{
            itemData.nftName || itemData.name
          }}</span>
          <span :class="$style['item-content-info-data-address']">
            {{
              baseData.type === "box"
                ? utilsFormat.formatSliceString(boxToken)
                : utilsFormat.formatSliceString(nftMeta)
            }}
          </span>
        </div>
        <div :class="$style['item-content-info-flag']">
          <!-- 可分解标示 -->
          <nft-card-item-tool-tip
            v-if="showDisassembledIcon(itemData.type)"
            :placeString="$t('metaverse.can be disassembled')"
            svgName="clothes"
            :svgStyle="{
              'margin-right': '8px',
            }"
          >
          </nft-card-item-tool-tip>
          <!-- 稀有值 -->
          <div
            v-if="showRarityIcon(itemData.type, itemData?.score)"
            :class="$style['item-content-info-flag-score']"
          >
            <nft-card-item-tool-tip
              :placeString="$t('NFT稀有值')"
              svgName="rarity"
            >
            </nft-card-item-tool-tip>
            <star-amount
              style="margin-left: 3px"
              :value="itemData?.score"
              :formatOptions="{
                precision: 2,
              }"
            >
            </star-amount>
          </div>
        </div>
      </div>

      <div :class="$style['item-content-slots']">
        <!-- 回购 -->
        <div
          v-if="props.cardType === 'buyback'"
          :class="$style['item-content-slots-buyback']"
        >
          <span>{{ $t("回收价格") }}：</span>
          <span> {{ itemData.buyPrice }} {{ itemData.currency }}</span>
        </div>

        <!-- market && collection selling -->
        <div
          v-if="
            props.cardType === 'market' ||
            (props.cardType === 'collection' && props.sellType === 'selling')
          "
          :class="$style['item-content-slots-market']"
        >
          <div :class="$style['item-content-slots-market-item']">
            <span
              >{{
                offerPriceStyle === "a" ? $t("最新报价") : $t("一口价")
              }}：</span
            >
            <span
              >{{ utilsFormat.formatPrice(itemData.sellPrice) }}
              {{ payToken }}</span
            >
          </div>
          <!-- <div :class="$style['item-content-slots-market-item']">
            <span>{{ $t("售价") }}：</span>
            <span
              >{{ utilsFormat.formatPrice(itemData.sellPrice) }}
              {{ utilsFormat.getTokenCurrency(itemData.payToken) }}</span
            >
          </div>
          <div :class="$style['item-content-slots-market-item']">
            <span>{{ $t("最高出价") }}：</span>
            <span v-if="Number(itemData.offerPrice) > 0">
              {{ utilsFormat.formatPrice(itemData.offerPrice) }}
              {{ utilsFormat.getTokenCurrency(itemData.payToken) }}
            </span>
            <span v-else style="text-align: right">
              {{ $t("暂无报价") }}
            </span>
          </div> -->
        </div>
        <!-- collection -->
        <div
          v-if="props.cardType === 'collection'"
          :class="$style['item-content-slots-collection']"
        >
          <div
            v-if="props.sellType === 'selling'"
            :class="$style['item-content-slots-collection-btns']"
          >
            <star-button
              v-if="Number(baseData.offerPrice) > 0"
              type="light"
              :class="[
                $style['item-content-slots-collection-selling-btn'],
                $style['item-content-slots-collection-selling-btn-light'],
              ]"
              @click="actionsCall('AcceptBid')"
              >{{
                $t("接受") +
                ` ${formatPriceWithLength(
                  baseData.offerPrice
                )} ${utilsFormat.getTokenCurrency(baseData.payToken)}`
              }}
            </star-button>

            <star-button
              type="dark"
              :style="{ width: Number(baseData.offerPrice) <= 0 ? '100%' : '' }"
              :class="$style['item-content-slots-collection-selling-btn']"
              @click="actionsCall('CancelSell')"
              >{{ $t("取消出售") }}</star-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { defineProps, reactive, computed, defineEmits, onUnmounted } from "vue";
import { useStore } from "vuex";
import StarButton from "@StarUI/StarButton.vue";
import Confirm from "@components/NFT/Confirm";
import utilsFormat from "@utils/format";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarAmount from "@StarUI/StarAmount";
import NftCardItemToolTip from "./NFTCardItemToolTip.vue";
import { useNFT } from "../../hooks/useNFT";
import utilsTool from "@utils/tool";
const store = useStore();
const props = defineProps({
  cardType: {
    type: String,
    default: "", //buyback平台回购，market 市场 collection 收藏 ,
  },
  sellType: {
    type: String,
    default: "", //selling 我的NFT销售中
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
  countdown: null,
});

const { getNFTType, isNFT, getOfferPriceStyle, nftTypes } = useNFT(
  store,
  props.baseData
);

let getCountDown = (timestamp) => {
  if (timestamp) {
    setTimeout(() => {
      const res = utilsTool.getCountDown(timestamp);
      state.countdown = res;
    }, 1000);
  }
};

onUnmounted(() => {
  getCountDown = null;
});

const formatPriceWithLength = (price) => {
  const t = utilsFormat.formatPrice(price, 9, { grouped: false });
  if (t && t.length > 3) {
    return t.slice(0, 3) + "...";
  }
  return t;
};

const showDisassembledIcon = (type) => {
  return type === "composite_card" || type === "composite_element";
};
const showRarityIcon = (type, score) => {
  if (nftTypes.indexOf(type) > -1 && score) {
    return true;
  }
  return false;
};

const showCountDown = (cardType, count, sellType) => {
  if (cardType === "market" && count) return true;
  if (cardType === "collection" && count && sellType === "selling") return true;
  return false;
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
  emits("watchDetail", {});
};
const actionsCall = (action) => {
  emits("actionsCall", { action: action, baseData: props.baseData });
};
</script>

<style lang="scss" module>
$border-radius: 16px;
$gray: #7f7f7f;
$fontWeight: bold;
$black: #010e22;

.nft-card-item {
  min-height: 370px;
  width: 279px;
  background: $white;
  box-shadow: 0px 8px 16px 0px rgba(223, 205, 185, 0.46), 0px 1px 0px 0px $white;
  border-radius: 16px;
  font-size: 14px;
  user-select: none;
  margin-bottom: 20px;
  // padding-bottom: 10px;
  overflow: hidden;
  margin-right: 20px;
  &:hover {
    box-shadow: 0 18px 32px -18px #000 !important;
    transform: translateY(-3px);
  }
  .img-box {
    width: 279px;
    height: 279px;
    position: relative;
    cursor: pointer;
    border-bottom: 0.5px solid #d1d1d1;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    img {
      cursor: pointer;
      max-width: 279px;
      max-height: 279px;
      width: 100%;
      height: 100%;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
    .countdown-box {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 113px;
      height: 28px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      top: 16px;
      right: 16px;
      color: #fff;
      span {
        font-size: 13px;
      }
    }
  }
  .item-content {
    padding: 12px 16px;
    .item-content-info {
      display: flex;
      justify-content: space-between;
      .item-content-info-data {
        display: flex;
        flex-direction: column;
        .item-content-info-data-name {
          font-weight: bold;
        }
        .item-content-info-data-address {
          color: #7f7f7f;
          font-size: 14px;
        }
      }
      .item-content-info-flag {
        display: flex;
        .item-content-info-flag-score {
          color: #fb8000;
          font-weight: bold;
          display: flex;
        }
      }
    }
    .item-content-slots {
      .item-content-slots-buyback {
        margin: 10px 0px;
        text-align: center;
        display: block;
        font-size: 14px;
        span {
          font-weight: $fontWeight;
        }
        span:first-child {
          color: $gray;
        }
        span:nth-child(2) {
          color: $black;
        }
      }
      .item-content-slots-market {
        margin: 10px 0px;
        .item-content-slots-market-item {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          span {
            font-weight: $fontWeight;
          }
          span:first-child {
            color: $gray;
          }
          span:nth-child(2) {
            color: $black;
          }
        }
      }
      .item-content-slots-collection {
        .item-content-slots-collection-btns {
          display: flex;
          justify-content: space-between;
          margin: 10px auto 0px;
        }
        .item-content-slots-collection-selling-btn {
          height: 10px;
          line-height: 10px;
          width: 46%;
          padding-left: 0;
          padding-right: 0;
        }
        .item-content-slots-collection-selling-btn-light {
          border: 1px solid $border-gray-color;
          color: $text-black-color;
        }
      }
    }
  }
}
</style>
