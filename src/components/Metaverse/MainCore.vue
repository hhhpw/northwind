<template>
  <div :class="$style.wrap">
    <role></role>
    <div :class="$style.main">
      <template v-if="state.type === 'not-generated'">
        <element-panel></element-panel>
        <compose-panel></compose-panel
      ></template>
      <template v-if="state.type === 'generated'">
        <user-hero-card></user-hero-card>
        <hero-info></hero-info>
      </template>
    </div>
  </div>

  <selector-modal></selector-modal>
  <wallet-operate-modal></wallet-operate-modal>
  <second-confirm-modal></second-confirm-modal>
</template>
<script setup>
/* eslint-disable*/
import { computed, reactive, watchEffect } from "vue";
import Role from "@components/Metaverse/Role.vue";
import ElementPanel from "./ElementPanel.vue";
import ComposePanel from "./ComposePanel.vue";
import SelectorModal from "@components/Metaverse/SelectorModal.vue";
import WalletOperateModal from "./WalletOperateModal.vue";
import SecondConfirmModal from "./SecondConfirmModal.vue";
import HeroInfo from "@components/Metaverse/HeroInfo.vue";
import UserHeroCard from "@components/Metaverse/UserHeroCard.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  type: computed(() => store.state.StoreMeta.type),
  accounts: computed(() => store.state.StoreWallet.accounts),
});

watchEffect(() => {
  if (state.accounts && state.accounts[0]) {
    store.dispatch("StoreMeta/getNFTDataByType", {
      userAddress: state.accounts[0],
      nftType: "split",
    });
  }
});
</script>
<style lang="scss" module>
.wrap {
  width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid red;
  .main {
    display: flex;
    margin-top: 30px;
  }
}
</style>
