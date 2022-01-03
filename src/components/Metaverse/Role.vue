<template>
  <div :class="$style['role']">
    <!-- 无角色卡片 -->
    <!-- <div :class="$style['role-no-character']">
      <p>
        {{ $t("metaverse.character card not obtained") }}
      </p>
      <p>
        {{ $t("metaverse.character card making") }}
      </p>
    </div> -->
    <!-- 角色卡片 -->
    <div :class="$style['role-character']">
      <div
        v-for="(d, i) in state.roleLists"
        :key="i"
        :class="$style['role-character-item']"
        @mouseenter.stop="hoverEvent(i, true)"
        @mouseleave.stop="hoverEvent(i, false)"
      >
        <div
          :class="$style['role-character-item-mask']"
          :ref="
            (el) => {
              if (el) state.maskDOMs[i] = el;
            }
          "
        >
          <p>tony W</p>
          <p># 6...12</p>
        </div>
        <img :src="d" />
      </div>
      <div :class="$style['role-character-add']">
        <img src="../../assets/metaverse/add-role.png" />
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, nextTick } from "vue";
const state = reactive({
  maskDOMs: [],
  roleLists: [
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/a514fbd5-36c0-47a3-9f7e-819541c03300/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/a514fbd5-36c0-47a3-9f7e-819541c03300/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/a514fbd5-36c0-47a3-9f7e-819541c03300/public",
    "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
  ],
});
const hoverEvent = (index, flag) => {
  nextTick(() => {
    if (flag) {
      state.maskDOMs[index].style.display = "block";
      return;
    }
    state.maskDOMs[index].style.display = "none";
  });
};
</script>
<style lang="scss" module>
.role {
  // width: 1100px;
  height: 136px;
  background: linear-gradient(180deg, #fef5d3 0%, #f2decb 100%);
  box-shadow: 0px 6px 13px 0px rgba(223, 205, 185, 0.46),
    inset 1px 1px 0px 0px #ffecd4,
    inset -1px -1px 0px 0px rgba(220, 164, 105, 0.36);
  border-radius: 13px;
  display: flex;
  padding: 0px 20px;
  overflow-x: scroll;
  .role-no-character {
    font-size: 14px;
    color: #8b8b8b;
    align-self: center;
    p:first-child {
      color: #391b0f;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .role-character {
    display: flex;
    align-self: center;
    .role-character-item {
      width: 108px;
      height: 108px;
      border: 2px solid #fff;
      box-sizing: border-box;
      // box-shadow: ;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      &:not(:first-child) {
        margin-left: 15px;
      }
      &:hover {
        cursor: pointer;
      }
      .role-character-item-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        display: none;
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
      }

      // border: 2px solid #fb8000;
      // cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .role-character-add {
      display: inline-block;
      margin-left: 15px;
      width: 108px;
      height: 108px;
      cursor: pointer;
    }
  }
}
</style>
