<template>
  <div :class="$style['container-farm-liquidity-header']">
    <p>{{ $t("farms.farm-liquidity-title") }}</p>
    <p v-if="state.totalStakeAmount">
      {{
        $t("farms.farm-liquidity-stake-total", {
          amount: formatAmount(state.totalStakeAmount),
        })
      }}
    </p>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import utilsNumber from "@utils/number";
import { useStore } from "vuex";
let store = useStore();
let state = reactive({
  totalStakeAmount: computed(() => store.state.StoreFarms.totalStakeAmount),
});
if (!state.totalStakeAmount) {
  store.dispatch("StoreFarms/getLpTotalStakeAmount");
}
const formatAmount = (amount) => {
  return utilsNumber.formatNumberMeta(amount, {
    grouped: true,
    precision: 2,
    trailingZero: false,
  }).text;
};
</script>
<style lang="scss" module>
.container-farm-liquidity-header {
  background-image: url("../../../assets/farms/header.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding-left: 30px;
  width: 100%;
  height: 170px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  p {
    color: #3f1c09;
    font-size: 24px;
  }
  p:first-child {
    font-weight: 600;
    font-size: 36px;
  }
}
</style>
