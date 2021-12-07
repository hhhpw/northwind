<template>
  <div class="mining-no-data">
    <img src="../../../assets/nft/mining-no-data.png" />
    <p style="color: #8b8b8b">
      {{ $t("nftmining.nft-selector-nodata") }}
    </p>
    <p class="mining-no-data-link" @click="pushMarket">
      {{ $t("去市场转转吧") }}
    </p>
  </div>
</template>
<script setup>
import utilsRouter from "@utils/router";
import { useStore } from "vuex";
const store = useStore();
const pushMarket = () => {
  store.commit("StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS", {
    dialogVisible: false,
  });
  utilsRouter.push({
    path: "/nftmarket",
  });
};
</script>
<style lang="scss" scoped>
.mining-no-data {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60vh;
  img {
    display: inline-block;
    margin-bottom: 20px;
    width: 110px;
    height: 110px;
  }
  .mining-no-data-link {
    color: rgb(251, 128, 0);
    border-bottom: 1px dashed rgb(251, 128, 0);
    cursor: pointer;
  }
}
</style>
