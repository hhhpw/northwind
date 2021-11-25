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
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import utilsRouter from "@utils/router";
const pushMarket = () => {
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
  }
  .mining-no-data-link {
    color: rgb(251, 128, 0);
    border-bottom: 1px dashed rgb(251, 128, 0);
    cursor: pointer;
  }
}
</style>
