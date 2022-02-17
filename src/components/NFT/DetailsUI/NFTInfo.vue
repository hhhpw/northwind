<template>
  <div class="details-info">
    <div class="base-info-title">
      <span class="base-info-color">{{
        state.isNFT ? props.box_detail.seriesName : props.box_detail.name
      }}</span>
    </div>

    <span class="base-info-color" v-if="state.isNFT">{{
      props.box_detail.name
    }}</span>
    <div class="base-info-list">
      <!-- 素材 -->
      <div
        class="base-info-item"
        v-if="state.isNFT && props.box_detail.nftType"
      >
        <span class="title">{{ $t("category") }}</span>
        <span class="value">
          <span v-if="props.box_detail.nftType === 'COMPOSITE_ELEMENT'">
            {{ $t("components") }}
          </span>
          <span v-if="props.box_detail.nftType === 'COMPOSITE_CARD'">
            <SvgIcon name="clothes"></SvgIcon>
            {{ $t("disassembled NFT") }}
          </span>
          <span v-if="props.box_detail.nftType === 'NORMAL'">
            {{ $t("original NFT") }}
          </span>
        </span>
      </div>
      <!-- 稀有值 -->
      <div class="base-info-item" v-if="state.isNFT && props.box_detail?.score">
        <span class="title">{{ $t("稀有值") }}</span>
        <span class="value">
          <svg-icon name="rarity" style="margin-right: 4px"></svg-icon>
          <star-amount
            :value="props.box_detail?.score"
            :formatOptions="{
              precision: 2,
            }"
          >
          </star-amount>
        </span>
      </div>

      <div
        class="base-info-item-character-info"
        v-if="state.isNFT && props.box_detail.nftType === 'COMPOSITE_CARD'"
      >
        <span style="margin-right: 8px">
          {{ $t("name") }}:
          <span class="base-info-item-character-info-value">
            {{ props.box_detail?.customName }}</span
          >
        </span>
        <span style="margin-right: 8px" v-if="props.box_detail?.occupation">
          {{ $t("profession") }}
          <span class="base-info-item-character-info-value">
            {{ props.box_detail?.occupation }}</span
          >
        </span>
        <span
          style="margin-right: 8px"
          v-if="props.box_detail?.sex === 1 || props.box_detail?.sex === 0"
        >
          {{ $t("sex") }}
          <span class="base-info-item-character-info-value">{{
            props.box_detail?.sex === 1 ? $t("male") : $t("female")
          }}</span>
        </span>
      </div>
      <div
        class="base-info-item"
        style="margin-top: 20px"
        v-if="props.box_detail?.creator"
      >
        <span class="title">{{ $t("创建者") }}</span>
        <span
          class="value"
          @click="
            pushPage(props.box_detail.creator || props.box_detail.address)
          "
          >{{
            stringFormat(
              props.box_detail &&
                (props.box_detail.creator || props.box_detail.address)
            )
          }}</span
        >
      </div>
      <div
        class="base-info-item"
        v-if="props.box_detail && props.box_detail.owner"
      >
        <span class="title">{{ $t("当前持有者") }}</span>
        <span class="value" @click="pushPage(props.box_detail.owner)">{{
          stringFormat(props.box_detail && props.box_detail.owner)
        }}</span>
      </div>
      <div class="base-info-item" v-if="state.nft_address">
        <span class="title">{{ $t("合约地址") }}</span>
        <span
          class="value"
          @click="pushPage(state.nft_address.split('::')[0])"
          >{{
            state.isNFT
              ? state.nft_address.slice(0, 6) +
                "..." +
                state.nft_address.slice(-4)
              : stringFormat(state.nft_address)
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from "@components/SvgIcon/Index.vue";
</script>
<style lang="scss" scoped>
.details-info {
  flex: 1;
  color: #3f1c09;
  margin-left: 33px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  .base-info-title {
    font-size: 32px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .base-info-title-rarity {
      font-size: 16px;
      .base-info-title-rarity-icon {
        margin-right: 5px;
        cursor: default;
      }
    }
  }
  .base-info-list {
    margin-top: 24px;
    .base-info-item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 8px;
      .title {
        color: #7f7f7f;
      }
      .value {
        cursor: pointer;
        color: #3f1c09;
      }
    }
  }
  .base-info-item-character-info {
    font-size: 14px;
    color: #7f7f7f;
    .base-info-item-character-info-value {
      color: #3f1c09 !important;
    }
  }
  .detail-actions {
    margin-top: 20px;
  }
}
</style>
