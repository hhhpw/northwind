<template>
  <div :class="$style['my-power']" v-if="state.miningData">
    <div :class="$style['my-power-header']">
      <div :class="$style['my-power-item']">
        <p :class="$style['title']">{{ $t("nftmining.my-mining-power") }}</p>
        <p v-if="state.walletStatus !== 'connected'">- -</p>
        <star-amount
          :class="$style['amount']"
          v-else
          :value="state.miningData.userScore"
          :formatOptions="{ precision: 0, trailingZero: false }"
        ></star-amount>
      </div>
      <div :class="$style['my-power-item']">
        <p :class="$style['title']">{{ $t("收益") }}</p>
        <p v-if="state.walletStatus !== 'connected'">- -</p>
        <star-amount
          :class="$style['amount']"
          v-else
          :value="state.miningData.currentReward"
          :formatOptions="{ precision: 0, trailingZero: false }"
          displaySuffix="KIKO"
        ></star-amount>
      </div>
    </div>
    <div :class="$style['my-power-content']">
      <div
        :class="$style['button']"
        ref="buttonDOM"
        @mouseenter="enterBtn(true)"
        @mouseleave="enterBtn(false)"
        @click="store.dispatch('StoreNFTMining/canDrawReward')"
      >
        {{ $t("收获") }}
      </div>
      <div :class="$style['year-profit']">
        <p :class="$style['title']">
          {{ $t("nftmining.my-mining-year-profit") }}
        </p>
        <p v-if="state.walletStatus !== 'connected'">- -</p>
        <star-amount
          v-else
          :class="$style['amount']"
          :value="state.miningData.userApr"
          :formatOptions="{
            precision: 0,
            trailingZero: false,
            percentStyle: true,
          }"
        ></star-amount>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, nextTick, ref } from "vue";
import StarAmount from "@StarUI/StarAmount.vue";
import { useStore } from "vuex";
import btnBg from "../../../assets/nft/mining-nft-btn.png";
import btnHoverBg from "../../../assets/nft/mining-nft-btn-hover.png";
let buttonDOM = ref();
const store = useStore();
let state = reactive({
  buttonDOM: null,
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
  miningData: computed(() => store.state.StoreNFTMining.miningData),
});

const enterBtn = (flag) => {
  nextTick(() => {
    if (flag) {
      buttonDOM.value.style.backgroundImage = `url(${btnHoverBg})`;
      return;
    }
    buttonDOM.value.style.backgroundImage = `url(${btnBg})`;
  });
};
</script>
<style lang="scss" module>
.amount {
  font-size: 24px;
  font-weight: bolder;
}
.my-power {
  position: absolute;
  right: 25px;
  width: 380px;
  height: 160px;
  top: 55px;
  color: #ffffff;
  .title {
    font-weight: 600;
    font-size: 14px;
  }

  .my-power-header {
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    margin-top: 20px;
    .my-power-item {
      .amount {
        font-size: 24px;
        font-weight: normal;
      }
    }
  }
  .my-power-content {
    display: flex;
    padding: 0px 20px;
    margin-top: 15px;
    .button {
      width: 190px;
      height: 70px;
      font-size: 20px;
      line-height: 60px;
      background-image: url("../../../assets/nft/mining-nft-btn.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
      text-align: center;
      vertical-align: middle;
      :hover {
        opacity: 0.5;
      }
    }
    .year-profit {
      margin-left: 20px;
      margin-top: 5px;
    }
  }
}
</style>
