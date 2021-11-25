<template>
  <div :class="$style['card-wrap']">
    <div
      v-for="(d, i) in state.list"
      :key="i"
      :class="$style['card-wrap-item']"
      @mouseenter="changeBtnStatus(i, true)"
      @mouseleave="changeBtnStatus(i, false)"
    >
      <img :src="d.img" />
      <p :class="$style['card-wrap-item-text']">{{ $t("算力") }}： 80</p>
      <div v-show="d.isShow">
        <star-button type="dark" :class="$style['card-wrap-item-btn']">{{
          $t("质押")
        }}</star-button>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarButton from "@StarUI/StarButton";

let state = reactive({
  list: [
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3feb0886-08d1-4dc3-cee5-897403a1a000/public",
      isShow: false,
    },
  ],
});
const changeBtnStatus = (i, flag) => {
  if (flag) {
    state.list[i].isShow = true;
    return;
  }
  state.list[i].isShow = false;
};
</script>
<style lang="scss" module>
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  max-height: 60vh;
  height: 60vh;
  overflow: scroll;
  img {
    width: 144px;
    height: 144px;
    border-radius: 8px;
  }
  .card-wrap-item {
    padding: 15px 10px 15px;
    margin-bottom: 15px;
    margin-left: 12px;
    text-align: center;
    border: 2px solid transparent;
    // width: 120px;
    height: 220px;
    &:hover {
      border: 2px solid #ff9534;
      cursor: pointer;
    }
    .card-wrap-item-text {
      margin-top: 10px;
      color: #391b0f;
      font-size: 14px;
    }
    .card-wrap-item-btn {
      margin-top: 3px;
      padding: 8px 50px;
      border-radius: 6px;
      font-size: 14px;
    }
  }
}
</style>
