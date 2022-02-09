<template>
  <star-nft
    class="blind-box-container"
    coreType="list"
    :cardStyleType="false"
    :listTypeParams="{ minHeight: '800px' }"
  >
    <template #nft-list>
      <list v-if="!state.gelleryVisible"></list>
      <gallery v-else></gallery>
      <div class="import" @click="handlePush()">
        <img src="../../../assets/nft/import.png" alt="" />
        <span>{{ $t("导入合约地址") }}</span>
      </div>
    </template>
  </star-nft>
</template>

<style lang="scss" scoped>
.blind-box-container {
  margin: 0 auto;
  padding-bottom: 30px;
  min-height: 800px;
  .import {
    width: 158px;
    height: 158px;
    background: url("../../../assets/nft/import-bg.png");
    background-size: cover;
    text-align: center;
    position: fixed;
    z-index: 100;
    bottom: 10%;
    right: 5%;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      margin: 25px auto 0;
    }
    span {
      max-width: 100px;
      display: block;
      margin: 5px auto 10px;
    }
  }
}
</style>

<script setup>
import StarNft from "@StarUI/StarNFT.vue";
import list from "@components/NFT/BlindBox/list.vue";
import gallery from "@components/NFT/BlindBox/gallery.vue";
import { reactive } from "vue";
let state = reactive({
  gelleryVisible: false,
});

const handlePush = () => {
  state.gelleryVisible = !state.gelleryVisible;
};
</script>
