<template>
  <div :class="$style.container">
    <div :class="$style['header']">
      <div :class="$style['header-btn-wrap']">
        <div
          v-for="(d, i) in state?.metaData?.property"
          @click="changeProperty(d, i)"
          :key="i"
          :class="[
            $style['header-btn'],
            { [$style['header-btn-active']]: i === state.activeProperty },
          ]"
        >
          {{ $t(`nftproperty.${d.desc}`) }}
        </div>
        <span
          :class="$style['header-tip']"
          @click="
            store.commit('StoreMeta/SET_SELECTOR_DIALOG_PARAMS', {
              dialogVisible: true,
            })
          "
          >{{ $t("metaverse.obtain components") }}</span
        >
      </div>
    </div>
    <div :class="$style['main']">
      <template v-if="state.elementList && state.elementList.length > 0">
        <div
          :class="[$style['main-item'], $style['main-item-pos']]"
          v-for="(d, i) in state.elementList"
          :key="i"
          @click="selectElement(d, i)"
        >
          <div :class="$style['main-item-img']">
            <img :src="d.image" :class="$style['main-item-img-element']" />
            <img
              :class="$style['main-item-img-active']"
              src="../../assets/metaverse/selected.png"
              v-show="i === state.activeElement"
            />
            <svg-icon name="arrow"></svg-icon>
          </div>
          <div :class="$style['main-item-info']">
            <span>
              <svg-icon name="rarity"></svg-icon>
              <span>{{ d.score }}</span>
            </span>
            <span :class="$style['main-item-info-amount']">
              <span>&times;</span>
              <span style="margin-left: 3px">{{ calcAmount(d.sum, i) }}</span>
            </span>
          </div>
        </div>
        <no-element-item
          style="margin-top: 20px"
          :class="$style['main-item-pos']"
        ></no-element-item>
      </template>
      <div :class="$style['main-no-data']" v-else>
        <no-element-item style="margin-top: 160px"></no-element-item>
        <div>
          <span>{{
            $t("metaverse.disassemble an nft detail description one")
          }}</span>
          <span>{{
            $t("metaverse.disassemble an nft detail description two")
          }}</span>
        </div>
      </div>
      <!-- <template v-else>
        <no-element-item :class="$style['main-no-data']"></no-element-item>
        <span>{{ $t("metaverse.disassemble nft detail description") }}</span>
      </template> -->
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import NoElementItem from "./NoElementItem.vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  property: ["身体", "发型", "发饰", "衣服", "裤子"],
  activeProperty: 0,
  activeElement: null,
  metaData: computed(() => store.state.StoreMeta.metaData),
  elementList: computed(() => store.getters["StoreMeta/elementList"]),
});

const activeMap = new Map();

const selectElement = (ele, index) => {
  if (index === state.activeElement) {
    store.dispatch("StoreMeta/setSelectedElementList", {
      type: "delete",
      data: ele,
    });
    state.activeElement = null;
    activeMap.delete(state.activeProperty);
    return;
  }
  state.activeElement = index;
  if (!activeMap.has(state.activeProperty)) {
    activeMap.set(state.activeProperty, state.activeElement);
  }
  store.dispatch("StoreMeta/setSelectedElementList", {
    type: "add",
    data: ele,
  });
};

const calcAmount = (amount, index) =>
  computed(() => {
    if (state.activeElement === index) {
      return Math.max(amount - 1, 0);
    }
    return Math.max(amount, 0);
  }).value;

const changeProperty = (d, i) => {
  store.commit("StoreMeta/SET_CURR_NFT_PROPERTY", d);
  state.activeProperty = i;
  if (activeMap.has(state.activeProperty)) {
    state.activeElement = activeMap.get(state.activeProperty);
  } else {
    state.activeElement = null;
  }
};
</script>
<style lang="scss" module>
$mainHeight: 460px;
@mixin activeBtnStyle {
  background: #ad865c;
  color: #fff;
  transition: all ease 0.2s;
}
.container {
  // background: red;
  width: 600px;
  height: 600px;
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
      right: 0px;
      &:hover {
        cursor: pointer;
      }
    }
    .header-btn-wrap {
      overflow: hidden;
      width: 440px;
      .header-btn {
        min-width: 64px;
        float: left;
        height: 32px;
        padding: 0px 10px;
        border-radius: 8px;
        line-height: 32px;
        border: 1px solid #ad865c;
        box-sizing: border-box;
        color: #ad865c;
        font-size: 16px;
        margin: 4px 0px;
        margin-right: 6px;
        text-align: center;
        &:not(:first-child) {
          // margin-left: 10px;
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
    height: $mainHeight;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: scroll;
    // background: red;
    .main-no-data {
      align-self: center;
      width: 100%;
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 60px;
      }
      span {
        color: #a89587;
        font-size: 14px;
        display: inline-block;
      }
    }
    .main-item-pos {
      float: left;
      &:not(:nth-child(4n + 1)) {
        margin-left: 33px;
      }
    }
    .main-item {
      cursor: pointer;
      // height: 100%;
      margin-top: 20px;
      float: left;
      .main-item-img {
        width: 102px;
        height: 102px;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid rgba(251, 128, 0, 0.52);
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
