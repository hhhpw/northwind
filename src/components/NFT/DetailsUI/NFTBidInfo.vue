<template>
  <div class="nft-bid-info">
    <div class="price" v-if="props.sellType === 1">
      <div class="price-item">
        <label for="">{{ t("一口价") }}</label>
        <span
          >{{
            (props.box_detail.sellingPrice &&
              utilsFormat.formatPrice(props.box_detail.sellingPrice)) ||
            $t("暂无报价")
          }}
          {{
            props.box_detail.sellingPrice &&
            utilsFormat.formatPrice(props.box_detail.sellingPrice)
              ? utilsFormat.getTokenCurrency(props.box_detail.payToken)
              : ""
          }}</span
        >
      </div>
    </div>
    <div class="price bid" v-else>
      <div class="price-item">
        <label for="">{{ t("最高出价") }}</label>
        <span
          >{{
            (props.box_detail.topBidPrice &&
              utilsFormat.formatPrice(props.box_detail.topBidPrice)) ||
            $t("暂无报价")
          }}
          {{
            props.box_detail.topBidPrice &&
            utilsFormat.formatPrice(props.box_detail.topBidPrice)
              ? utilsFormat.getTokenCurrency(props.box_detail.payToken)
              : ""
          }}</span
        >
      </div>
      <div class="price-item">
        <label for="">{{ t("起拍价") }}</label>
        <span
          >{{
            (props.box_detail.sellingPrice &&
              utilsFormat.formatPrice(props.box_detail.sellingPrice)) ||
            $t("暂无报价")
          }}
          {{
            props.box_detail.sellingPrice &&
            utilsFormat.formatPrice(props.box_detail.sellingPrice)
              ? utilsFormat.getTokenCurrency(props.box_detail.payToken)
              : ""
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";
import utilsFormat from "@utils/format";
const { t } = useI18n();
let props = defineProps({
  box_detail: {
    type: Object,
    default: () => {},
  },
  sellType: {
    type: String,
    default: () => "1",
  }, // 1一口价, 2拍卖
});
</script>
<style lang="scss" scoped>
.nft-bid-info {
  display: flex;
  background: #fafafa;
  border-radius: 8px;
  padding: 17px 0;
  margin-bottom: 20px;
  .price {
    display: flex;
    flex: 1;
    justify-content: space-between;
    .price-item {
      flex: 1;
      text-align: center;

      label,
      span {
        display: block;
        color: #161311;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
