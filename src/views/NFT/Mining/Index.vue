<template>
  <div class="mining-container">
    <star-nft coreType="list" class="mining-container-nft">
      <template #nft-list>
        <mining-core></mining-core>
      </template>
    </star-nft>
  </div>
</template>
<script setup>
/* eslint-disable */
import StarNft from "@StarUI/StarNFT.vue";
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import MiningCore from "@components/NFT/Mining/MainCore.vue";
</script>

<style lang="scss" scoped>
.mining-container {
  .mining-container-nft {
    margin: 0 auto;
    padding-bottom: 30px;
    .nft-card-core {
    }
  }
}
</style>
