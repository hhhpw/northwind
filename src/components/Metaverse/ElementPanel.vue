<template>
  <div :class="$style.container">
    <div :class="$style['header']">
      <div :class="$style['header-btn-wrap']">
        <div
          v-for="(d, i) in state.elements"
          :key="i"
          :class="[
            $style['header-btn'],
            { [$style['header-btn-active']]: i === state.activeIndex },
          ]"
        >
          {{ d }}
        </div>
        <span :class="$style['header-tip']">{{
          $t("metaverse.get element")
        }}</span>
      </div>
    </div>
    <div :class="$style['main']">
      <template v-if="state.hasData">
        <div
          :class="$style['main-item']"
          v-for="(d, i) in state.list"
          :key="i"
          @click="selectElement(i)"
        >
          <div :class="$style['main-item-img']">
            <img :src="d.img" />
            <div
              :class="$style['main-item-img-active']"
              v-show="i === state.activeElement"
            >
              <svg-icon name="arrow"></svg-icon>
            </div>
          </div>
          <div :class="$style['main-item-info']">
            <span>
              <svg-icon name="rarity"></svg-icon>
              <span>{{ d.rarity }}</span>
            </span>
            <span :class="$style['main-item-info-amount']">
              <span>&times;</span>
              <span style="margin-left: 3px">{{ d.amount }}</span>
            </span>
          </div>
        </div>
        <no-element-item style="margin-top: 20px"></no-element-item>
      </template>
      <div :class="$style['main-no-data']" v-else>
        <no-element-item style="margin-top: 160px"></no-element-item>
        <span>{{ $t("metaverse.break down nft detail description") }}</span>
      </div>
      <!-- <template v-else>
        <no-element-item :class="$style['main-no-data']"></no-element-item>
        <span>{{ $t("metaverse.break down nft detail description") }}</span>
      </template> -->
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import NoElementItem from "./NoElementItem.vue";
const state = reactive({
  elements: ["身体", "发型", "发饰", "衣服", "裤子"],
  activeIndex: 0,
  activeElement: null,
  list: [
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
      amount: 12,
      rarity: 13,
    },
  ],
});
const selectElement = (index) => {
  state.activeElement = index;

  // state.list[index].isShow = true;
};
</script>
<style lang="scss" module>
@mixin activeBtnStyle {
  background: #ad865c;
  color: #fff;
  transition: all ease 0.2s;
}
.container {
  // background: red;
  width: 600px;
  height: 600px;
  border: 1px solid red;
  background-image: url("../../assets/metaverse/left-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px;
  box-sizing: border-box;
  .header {
    position: relative;
    .header-tip {
      color: #fb8000;
      font-size: 14px;
      line-height: 32px;
      position: absolute;
      right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
    .header-btn-wrap {
      display: flex;
      .header-btn {
        width: 64px;
        height: 32px;
        border-radius: 8px;
        line-height: 32px;
        border: 1px solid #ad865c;
        box-sizing: border-box;
        color: #ad865c;
        font-size: 16px;
        text-align: center;
        &:not(:first-child) {
          margin-left: 10px;
        }
        &:hover {
          cursor: pointer;
          @include activeBtnStyle();
        }
      }
      .header-btn-active {
        @include activeBtnStyle();
      }
    }
  }
  .main {
    display: flex;
    min-height: 500px;
    flex-wrap: wrap;
    border: 1px solid red;
    align-content: flex-start;
    .main-no-data {
      // align-self: center;
      width: 100%;
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: #a89587;
        font-size: 14px;
        margin-top: 200px;
      }
    }
    .main-item {
      cursor: pointer;
      flex-basis: 25%;
      height: 100%;
      margin-top: 20px;
      .main-item-img {
        width: 102px;
        height: 102px;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .main-item-img-active {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 32px;
          height: 17px;
          background: #fb8000;
          border-radius: 9px;
          border: 2px solid #ffffff;
        }
      }
      .main-item-info {
        margin-top: 5px;
        background-color: rgba(239, 229, 218, 1);
        width: 102px;
        height: 20px;
        border-radius: 14px;
        color: #fb8000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 8px;
        box-sizing: border-box;
        font-size: 14px;
        .main-item-info-amount {
          color: #ad865c;
        }
        svg + span {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
