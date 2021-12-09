<template>
  <div :class="$style['total-data-container']" v-if="state.miningData">
    <div :class="$style['header']">
      <p :class="$style['title']">
        {{ $t("nftmining.total-mining-power") }}
      </p>
      <star-amount
        :value="state.miningData.totalScore"
        :class="$style['amount']"
        :formatOptions="{
          precision: 2,
          trailingZero: false,
        }"
      ></star-amount>
    </div>
    <div :class="$style['footer']">
      <div>
        <p :class="$style['title']">{{ $t("日产量") }}</p>
        <star-amount
          :class="$style['amount']"
          :value="state.miningData.dailyTotalOutput"
          displaySuffix="STC"
          :formatOptions="{
            precision: 2,
            trailingZero: true,
          }"
        ></star-amount>
      </div>
      <div :class="$style['year-profit']">
        <p :class="$style[('title', 'year-profit-title')]">
          {{ $t("平均年化收益") }}
        </p>
        <star-amount
          :class="$style['amount']"
          :value="state.miningData.avgApr"
          :formatOptions="{
            precision: 2,
            trailingZero: true,
            percentStyle: true,
          }"
        ></star-amount>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarAmount from "@StarUI/StarAmount.vue";
import { useStore } from "vuex";
const store = useStore();
let state = reactive({
  miningData: computed(() => store.state.StoreNFTMining.miningData),
});
</script>
<style lang="scss" module>
.amount {
  font-size: 24px;
  font-weight: normal;
}
.total-data-container {
  // color: red;
  position: absolute;
  width: 335px;
  height: 150px;
  color: #fff;
  top: 50px;
  left: 65px;
  .title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  .year-profit-title {
    color: #fb8000;
    font-weight: 600;
  }
  .header {
    margin-left: 20px;
    margin-top: 15px;
  }
  .footer {
    margin-top: 20px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
