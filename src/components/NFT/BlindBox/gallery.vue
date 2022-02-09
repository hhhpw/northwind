<template>
  <div>
    <star-scroll
      :hasMore="state.listStatus.hasMore"
      :isLoading="state.listStatus.isLoading"
      :isShowMore="false"
      @loadMore="loadMore"
      :textLoading="false"
      gifType="white"
      :imgLoading="true"
      v-if="state.listData && state.listData.length > 0 && !state.firstLoading"
    >
      <template #content>
        <div class="nft-gallery-list">
          <h3>{{ $t("导入合约地址") }}</h3>
          <div
            v-for="(d, i) in state.listData"
            :key="i"
            class="nft-gallery-list-item"
          >
            <img :src="d.seriesLogo" alt="" />
            <div class="nft-gallery-list-item-right">
              <star-space :size="15"></star-space>
              <p class="nft-gallery-list-item-right-title">
                {{ d.seriesName }}-{{ d.name }}
              </p>
              <star-space :size="5"></star-space>
              <p>
                <a class="nft-gallery-import" @click="importBlindBox(d)">{{
                  $t("导入盲盒地址")
                }}</a>
                <a class="nft-gallery-import" @click="importGallery(d)">{{
                  $t("导入陈列室")
                }}</a>
              </p>
              <star-space :size="15"></star-space>
              <p class="nft-gallery-address-info">
                <label for="" class="address">{{ $t("盲盒代币地址") }}:</label>
                <span>{{ d.boxToken }}</span>
              </p>
              <p class="nft-gallery-address-info">
                <label for="">NFT Meta:</label>
                <span>{{ d.nftMeta }}</span>
              </p>
              <p class="nft-gallery-address-info">
                <label for="">NFT Body:</label>
                <span>{{ d.nftBody }}</span>
              </p>
            </div>
          </div>
        </div>
      </template>
    </star-scroll>
    <star-loading-fish
      style="margin-top: 30px"
      gifType="white"
      v-if="state.firstLoading"
    ></star-loading-fish>
    <nft-dialog
      :dialogVisible="state.dialogParams.isShow"
      :isShowClose="!(state.dialogParams.dialogStatus === 'ongoing')"
      class="nft-blindbox-core-buycb-dialog"
      :dialogParams="state.dialogParams"
      @handleClose="handleClose"
      @handleSuccess="handleClose"
      @handleFailed="handleClose"
    ></nft-dialog>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, onUnmounted } from "vue";
import StarSpace from "@StarUI/StarSpace.vue";
import { cloneDeep } from "lodash";
import StarLoadingFish from "@StarUI/StarLoadingFish.vue";
import StarScroll from "@StarUI/StarScroll.vue";
import NftDialog from "@components/NFT/NFTDialog.vue";
import { useStore } from "vuex";
const store = useStore();

let state = reactive({
  listData: computed(() => store.state.StoreBlindBox.listData),
  timers: null,
  listStatus: computed(() => store.state.StoreBlindBox.listStatus),
  firstLoading: computed(() => store.state.StoreBlindBox.firstLoading),
  dialogParams: computed(() => store.state.StoreBlindBox.dialogParams),
});

const loadMore = () => {
  store.dispatch("StoreBlindBox/getOfferingList", { type: "scroll" });
};

onMounted(async () => {
  if (!state.listData || (state.listData && state.listData.length === 0)) {
    const data = await store.dispatch("StoreBlindBox/getOfferingList", {
      type: "init",
    });
    if (data && data.length) {
      state.timers = cloneDeep(data);
      state.timers.map((d) => {
        if (d.type === "willsell") {
          d.countdown = d.sellingTime;
        } else {
          d.countdown = "";
        }
      });
    }
  }
});

const handleClose = () => {
  window.location.reload();
};

const importBlindBox = (item) => {
  store.dispatch("StoreBlindBox/importBlindBoxGallery", {
    tyArgs: [item.boxToken],
    type: "blindbox",
  });
};

const importGallery = (item) => {
  const { nftMeta, nftBody } = item;
  store.dispatch("StoreBlindBox/importBlindBoxGallery", {
    tyArgs: [nftMeta, nftBody],
    type: "gellery",
  });
};

onUnmounted(() => {
  // store.commit("StoreBlindBox/CLEAR_DATA");
});
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.nft-gallery-list-item:not(:first-child) {
  margin-top: 20px;
}
.nft-gallery-list {
  background: #fff;
  padding: 35px 32px;
  border-radius: 34px;
  h3 {
    font-size: 24px;
    font-weight: 500;
  }
  .nft-gallery-address-info {
    display: flex;
    justify-content: flex-start;
    label {
      color: #8b8b8b;
      font-size: 14px;
      min-width: 80px;
      display: block;
      float: left;
      height: 40px;
      line-height: 40px;
    }
    span {
      color: $text-brown-color;
      font-size: 14px;
      margin-left: 20px;
      display: block;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      margin-top: 8px;
    }
    .address {
      font-size: 12px;
    }
  }
}
.nft-gallery-list-item {
  width: auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: #f7f7f7;
  padding: 16px;
  &:hover {
    opacity: 0.9;
  }
  img {
    width: 275px;
    height: 168px;
    margin: auto 0;
  }
  .nft-gallery-list-item-right {
    text-align: left;
    width: calc(100% - 310px);
    position: relative;
    .nft-gallery-list-item-right-title {
      color: $text-brown-color;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .nft-gallery-import {
    min-width: 120px;
    cursor: pointer;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 8px;
    background: #f88000;
    color: #ffffff;
    font-size: 8px;
    margin-right: 20px;
    padding: 1px 10px;
  }
}
</style>
