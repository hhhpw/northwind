<template>
  <div :class="$style['card-wrap']">
    <div
      v-for="(d, i) in state.list"
      :key="i"
      :class="$style['card-wrap-item']"
      @mouseenter="changeBtnStatus(i, true)"
      @mouseleave="changeBtnStatus(i, false)"
    >
      <img :src="d.imageLink" />
      <p :class="$style['card-wrap-item-text']">
        {{ $t("nftmining.mining-power") }}：
        <star-amount
          :value="d.score"
          :formatOptions="{
            precision: 2,
            trailingZero: true,
          }"
        >
        </star-amount>
      </p>
      <div v-show="d.isShow">
        <star-button
          type="dark"
          :class="$style['card-wrap-item-btn']"
          @click="
            store.dispatch('StoreNFTMining/stakeNFT', {
              imageLink: d.imageLink,
              id: d.id,
              order: d.order,
              meta: d.nftMeta,
              body: d.nftBody,
            })
          "
          >{{ $t("质押") }}</star-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import StarButton from "@StarUI/StarButton.vue";
import StarAmount from "@StarUI/StarAmount.vue";

const store = useStore();

let state = reactive({
  list: computed(() => store.state.StoreNFTMining.nftList),
  accounts: computed(() => store.state.StoreWallet.accounts),
});

watchEffect(() => {
  if (state.accounts && state.accounts[0]) {
    store.dispatch("StoreNFTMining/getUserNFTList", state.accounts[0]);
  }
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
      padding: 8px 30px;
      border-radius: 6px;
      font-size: 14px;
    }
  }
}
</style>
