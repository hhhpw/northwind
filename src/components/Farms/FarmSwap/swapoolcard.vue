<template>
  <div :class="$style['container-swap-card']">
    {{ props.data }}
    <div :class="$style['container-swap-card-header']">
      <div>
        <img src="../../../assets/nft/dialog-error.png" />
        <img
          src="../../../assets/common/net-error.png"
          :class="$style['token-b-img']"
        />
        <p :class="$style['container-swap-card-heard-symboldetail']">
          {{ props.data.pairName.replace("_", "/") }}
          <span :class="$style['container-swap-card-heard-raise']"
            >{{ props.data.allocationMultiple }}X</span
          >
        </p>
      </div>
      <div :class="$style['container-swap-card-header-right']">
        <star-amount
          :value="props.data.apy * 100"
          :formatOptions="{
            precision: 2,
            percentStyle: true,
          }"
          :class="$style['year-rate']"
        ></star-amount>
        <p>{{ $t("farms.farm-swap-pool-card-year-rate") }}</p>
      </div>
    </div>
    <div :class="$style['container-swap-card-totalreward']">
      <div
        v-for="(d, i) in state.totalReward"
        :key="i"
        :class="$style['container-swap-card-totalreward-item']"
      >
        <span>{{
          $t(`farms.farm-swap-pool-card-total-reward-item-${i + 1}`)
        }}</span>
        <star-amount
          :value="d"
          :formatOptions="{ precision: 2 }"
          :class="$style['container-swap-card-totalreward-item-amount']"
        >
        </star-amount>
      </div>
    </div>
    <div :class="$style['container-swap-card-line']"></div>
    <div :class="$style['container-swap-card-personreward']">
      <div
        v-for="(d, i) in state.personReWard"
        :key="i"
        :class="$style['container-swap-card-personreward-item']"
      >
        <span>
          {{ $t(`farms.farm-swap-pool-card-person-reward-item-${i + 1}`) }}
        </span>
        <div :class="$style['container-swap-card-personreward-item-right']">
          <img v-if="i !== 1" src="../../../assets/nft/dialog-loading.png" />
          <star-amount
            :class="$style['container-swap-card-personreward-item-amount']"
            :value="d || '0.0000'"
            :formatOptions="{
              precision: 4,
              trailingZero: true,
            }"
            :displayPreFix="i === 1 && d ? '$' : ''"
          >
          </star-amount>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import StarAmount from "@StarUI/StarAmount";
let state = reactive({
  totalReward: ["2321", "321321", "321971"],
  personReWard: [null, null, null],
});
const farmsTokenDisplay = () => {};
const props = defineProps({
  data: null,
});
</script>
<style lang="scss" module>
.container-swap-card {
  margin-bottom: 40px;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: all ease 0.2s;
  }
  .token-b-img {
    position: relative;
    right: 6px;
    z-index: 3;
  }
  .year-rate {
    font-weight: bold;
    color: #26bb8f;
    font-size: 24px;
  }
  background: #fff;
  box-shadow: 0px 8px 16px 0px rgba(223, 205, 185, 0.46),
    0px 1px 0px 0px #ffffff;
  border-radius: 16px;
  width: 300px;
  padding: 20px 15px;
  color: #391b0f;
  font-size: 14px;
  .container-swap-card-header {
    display: flex;
    justify-content: space-between;
    position: relative;
    font-weight: bold;
    align-items: center;
    img {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      // position: absolute;
    }
    .container-swap-card-header-right {
      text-align: right;
    }
  }
  .container-swap-card-heard-raise {
    color: rgba(251, 128, 0, 1);
  }
  .container-swap-card-heard-symboldetail {
    text-align: right;
  }
  .container-swap-card-totalreward {
    margin-top: 20px;
    .container-swap-card-totalreward-item {
      display: flex;
      padding: 10px 0px;
      justify-content: space-between;
      .container-swap-card-totalreward-item-amount {
        font-weight: bold;
      }
    }
  }
  .container-swap-card-line {
    margin: 20px 0px;
    height: 1px;
    width: 100%;
    background-color: #e8e0da;
  }
  .container-swap-card-personreward {
    .container-swap-card-personreward-item {
      display: flex;
      padding: 10px 0px;
      justify-content: space-between;
      .container-swap-card-personreward-item-right {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
          width: 16px;
          height: 16px;
        }
      }
      .container-swap-card-personreward-item-amount {
        font-weight: bold;
      }
    }
  }
}
</style>
