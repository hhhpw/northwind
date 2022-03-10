<template>
  <div class="liquidity-container">
    <Fly-space :size="20"></Fly-space>
    <!-- <div class="liquidity-container-btnwarp">
      <star-change-button :activeIndex="1"></star-change-button>
    </div> -->
    <Fly-space :size="25"></Fly-space>
    <fly-swap-card class="liquidity-container-card">
      <liquidity-core class="liquidity-container-core"></liquidity-core>
    </fly-swap-card>
    <liquidity-transition-card
      v-if="state.poolType === 'add' || state.poolType === 'delete'"
      class="liquidity-container-transition-card"
    ></liquidity-transition-card>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import LiquidityCore from "@components/Liquidity/core.vue";
import LiquidityTransitionCard from "@components/Liquidity/transitioncard.vue";
import FlySwapCard from "@FlyUI/FlySwapCard.vue";
// import StarChangeButton from "@StarUI/StarChangeButton.vue";
import FlySpace from "@FlyUI/FlySpace.vue";
import { useStore } from "vuex";
const store = useStore();
let state = reactive({
  poolType: computed(() => store.state.StoreLiquidity.poolType),
});
</script>
<style lang="scss" scoped>
.liquidity-container {
  // position: relative;
  // left: 50%;
  // display: inline-block;
  // transform: translate(-50%, 0);
  .liquidity-container-btnwarp {
    display: flex;
    justify-content: center;
  }
  .liquidity-container-card {
    margin: 0 auto;
    position: relative;
    .liquidity-container-core {
      position: relative;
      width: 100%;
    }
  }
  .liquidity-container-transition-card {
    margin: 0 auto;
    position: relative;
  }
}
</style>
