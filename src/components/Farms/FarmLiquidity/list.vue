<template>
  <div :class="$style['container-farm-liquidity-list']">
    <div :class="$style['container-farm-liquidity-list-ths']">
      <div
        :class="$style['container-farm-liquidity-list-ths-item']"
        v-for="(d, i) in new Array(7)"
        :key="i"
      >
        {{ $t(`farms.farm-liquidity-list-th-name-${i + 1}`) }}
      </div>
    </div>
    <div
      :class="$style['container-farm-liquidity-list-body']"
      v-if="state.poolList && state.poolList.length > 0"
    >
      <div
        :class="$style['container-farm-liquidity-list-body-item']"
        v-for="(d, i) in state.poolList"
        :key="i"
        @click="pushPage({ lpToken: d.pairName, id: d.id })"
      >
        <div :class="$style['container-farm-liquidity-list-body-item-symbol']">
          <span>
            <img :src="d.tokenIconA" />
            <img :src="d.tokenIconB" />
          </span>
          <span>{{ d.pairName.replace("_", "/") }}</span>
        </div>
        <div
          :class="$style['container-farm-liquidity-list-body-item-dayamount']"
        >
          <star-amount
            :value="d.dailyTotalOutput"
            :formatOptions="{
              precision: setPrecision(2),
              trailingZero: true,
              grouped: true,
              compact: true,
            }"
            displaySuffix="KIKO"
          >
          </star-amount>
        </div>
        <div :class="$style['container-farm-liquidity-list-body-item-apr']">
          <star-amount
            :value="d.apy"
            :formatOptions="{
              precision: setPrecision(2),
              trailingZero: false,
              percentStyle: true,
            }"
          >
          </star-amount>
          <list-tool-tip style="margin-left: 5px"></list-tool-tip>
        </div>
        <div
          :class="$style['container-farm-liquidity-list-body-item-totalstake']"
        >
          <star-amount
            :value="d.totalStakingAmount"
            :formatOptions="{
              precision: setPrecision(2),
              trailingZero: false,
              grouped: true,
              compact: true,
            }"
            displayPreFix="$"
          >
          </star-amount>
        </div>
        <div
          :class="$style['container-farm-liquidity-list-body-item-perstake']"
        >
          <star-amount
            :value="d.userStakingAmount"
            :formatOptions="{
              precision: setPrecision(2),
              trailingZero: false,
              grouped: true,
              compact: true,
            }"
            displayPreFix="$"
          >
          </star-amount>
        </div>
        <div
          :class="$style['container-farm-liquidity-list-body-item-perreward']"
        >
          <star-amount
            :value="d.userReward"
            :formatOptions="{
              precision: setPrecision(4),
              trailingZero: false,
              grouped: true,
              compact: true,
            }"
            displaySuffix="STC"
          >
          </star-amount>
        </div>

        <div :class="$style['container-farm-liquidity-list-body-item-mining']">
          {{ $t("挖矿") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive } from "vue";
import StarAmount from "@StarUI/StarAmount";
import SvgIcon from "@components/SvgIcon/Index.vue";
import ListToolTip from "./listtooltip";
import utilsRouter from "@utils/router";
import { useStore } from "vuex";
const store = useStore();
let state = reactive({
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
  poolList: computed(() => store.state.StoreFarms.poolList),
});

store.dispatch("StoreFarms/getLpPoolList");

const setValue = (value) =>
  computed(() => {
    if (state.walletStatus !== "connected") {
      return "0.00";
    } else {
      return value;
    }
  }).value;

const setPrecision = (precision) =>
  computed(() => {
    if (state.walletStatus !== "connected") {
      return 2;
    } else {
      return precision;
    }
  }).value;

// const defaultValue = computed(() => {
//   if (state.walletStatus !== "connected") {
//     return 0;
//   }
// });

const pushPage = ({ lpToken, id }) => {
  store.commit("StoreFarms/SET_CURR_LPTOKEN_INFO", {
    token: lpToken,
  });
  utilsRouter.push({
    path: "/liquidityfarmsdetail",
    query: {
      token: lpToken,
      id,
      // token: utilsRouter.encodePath(lpToken),
      // token: utilsRouter.encodePath(lpToken),
    },
  });
};
</script>
<style lang="scss" module>
.container-farm-liquidity-list {
  width: 100%;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 30px;
  .container-farm-liquidity-list-ths {
    display: flex;
    height: 52px;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid $border-gray-color;
    .container-farm-liquidity-list-ths-item {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #3f1c09;
      &:last-child {
        flex: 0.5;
      }
    }
  }
  .container-farm-liquidity-list-body {
    .container-farm-liquidity-list-body-item {
      cursor: pointer;
      color: #000000;
      font-size: 14px;
      height: 72px;
      border-bottom: 1px solid $border-gray-color;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 1px solid transparent;
      }
      &:hover {
        opacity: 0.6;
      }
      .container-farm-liquidity-list-body-item-symbol {
        text-align: right;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-block;
          border: 2px solid transparent;
        }
        img + img {
          border: 2px solid #fff;
          position: relative;
          left: -6px;
        }
        span {
          font-weight: bold;
        }
      }
      .container-farm-liquidity-list-body-item-dayamount {
        flex: 1;
        text-align: center;
      }
      .container-farm-liquidity-list-body-item-apr {
        flex: 1;
        text-align: center;
      }
      .container-farm-liquidity-list-body-item-totalstake {
        flex: 1;
        text-align: center;
      }
      .container-farm-liquidity-list-body-item-perstake {
        flex: 1;
        text-align: center;
      }
      .container-farm-liquidity-list-body-item-perreward {
        flex: 1;
        text-align: center;
      }
      .container-farm-liquidity-list-body-item-mining {
        flex: 0.5;
        color: #fb8000;
        font-weight: 600;
      }
    }
  }
}
</style>
