<template>
  <div class="details-img-content">
    <img
      v-if="props.isNFT"
      :src="
        props.box_detail?.imageLink ||
        (props.action_type === 'RECOVERY' && props.box_detail.icon)
      "
      alt=""
    />
    <div class="unopen-blind" v-else>
      <img
        :src="props.box_detail.boxTokenLogo || props.box_detail.icon"
        alt=""
      />
      <div class="unopen-blind-mask" v-if="props.isOwner && !props.isOnSell">
        <div class="unopen-blind-mask-line">
          <svg-icon name="left-double-arrow" style="font-size: 16px"></svg-icon>
          <span @click="actionsCall({ action: 'OpenBlinkBox' })">
            {{ $t("打开盲盒") }}
          </span>
          <svg-icon
            name="right-double-arrow"
            style="font-size: 16px"
          ></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
let props = defineProps({
  box_detail: {
    type: Object,
    default: () => {},
  },
  isNFT: {
    type: Boolean,
  },
  isOwner: {
    type: Boolean,
  },
  isOnSell: {
    type: Boolean,
  },
});
</script>
<style scoped lang="scss">
.details-img-content {
  width: 424px;
  height: 424px;
  background: #ffffff;
  border-radius: 14px;
  font-size: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    max-width: 424px;
    max-height: 424px;
  }
  .unopen-blind {
    margin: 0 auto;
    width: 424px;
    height: 424px;
    background: rgba(235, 235, 235, 0.22);
    text-align: center;
    line-height: 424px;
    position: relative;
    .unopen-blind-mask {
      background: rgba(0, 0, 0, 0.2);
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .unopen-blind-mask-line {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        width: 100%;
        height: 75px;
        font-size: 25px;
        font-weight: 600;
        position: absolute;
        top: 50%;
        transform: translate(0%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
        span {
          padding: 0px 20px;
        }
      }
    }
    img {
      vertical-align: middle;
      width: auto;
      height: auto;
    }
  }
}
</style>
