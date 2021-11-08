<template>
  <div :class="$style['container-person-data']">
    <div :class="$style['container-person-data-header']">
      <div
        :class="$style['container-person-data-header-item']"
        v-for="(d, i) in new Array(2)"
        :key="i"
      >
        <template v-if="i === 0">
          <div
            :class="[
              $style['container-person-data-header-item-block'],
              $style['after-block'],
            ]"
          >
            <!-- 当前挖矿收益kiko -->
            <p>{{ $t("farms.swap-farm-person-title1") }}</p>
            <star-amount
              :class="$style['container-person-data-header-item-block-amount']"
              :value="21313.12312"
              :formatOptions="{ precision: 2, trailingZero: false }"
            >
            </star-amount>
          </div>
          <star-button
            v-if="state.walletStatus === 'connected'"
            type="dark"
            :class="$style['container-person-data-header-item-btn']"
            >{{ $t("farms.swap-farm-draw") }}</star-button
          >
        </template>

        <template v-if="i === 1">
          <!-- 七日锁仓kiko -->
          <div :class="$style['container-person-data-header-item-block']">
            <p>{{ $t("farms.swap-farm-person-title2") }}</p>
            <star-amount
              :class="$style['container-person-data-header-item-block-amount']"
              :value="21313.12312"
              :formatOptions="{ precision: 4, trailingZero: true }"
            >
            </star-amount>
          </div>
          <star-button
            v-if="state.walletStatus === 'connected'"
            type="dark"
            :class="$style['container-person-data-header-item-btn']"
            >{{ $t("farms.swap-farm-draw") }}</star-button
          >
        </template>
      </div>
    </div>
    <star-button
      type="dark"
      :class="$style['connect-wallet-btn']"
      v-if="state.walletStatus !== 'connected'"
      @click="() => connectWallet()"
      >{{ $t("链接钱包") }}
    </star-button>
    <p :class="$style['container-person-data-drawdesc']">
      {{ $t("farms.swap-farm-person-drawdesc") }}
    </p>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import StarButton from "@StarUI/StarButton";
import StarAmount from "@StarUI/StarAmount";
import connectLogic from "@mixins/wallet";
import { useStore } from "vuex";
let store = useStore();

const { connectWallet } = connectLogic(store);
let state = reactive({
  data: ["23412231.12"],
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
});
</script>
<style lang="scss" module>
.container-person-data {
  color: #391b0f;
  background: #f9efe4;
  padding: 30px 20px 20px;
  // width: 400px;
  font-size: 14px;
  border-radius: 16px;
  .connect-wallet-btn {
    padding: 8px 20px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
  .container-person-data-header {
    display: flex;
    .container-person-data-header-item {
      flex: 1;
      text-align: center;
      .container-person-data-header-item-block {
        position: relative;
        padding-bottom: 20px;
        &.after-block::after {
          position: absolute;
          content: "";
          width: 1px;
          background: #e8e0da;
          height: 100%;
          right: 0%;
          top: 0;
        }
        .container-person-data-header-item-block-amount {
          margin-top: 3px;
          font-size: 24px;
          font-weight: bold;
        }
      }
      .container-person-data-header-item-btn {
        margin-top: 20px;
        padding: 8px 20px;
      }

      // display: flex;
      // justify-content: center;
      // align-items: center;
      // flex-direction: column;
      // .container-person-data-header-item-block {
      //   border-right: 1px solid red;
      // }
      // .container-person-data-header-item-block-div {
      //   width: 2px;
      //   height: 30px;
      //   background: red;
      //   poa
      // }
    }
  }
  .container-person-data-drawdesc {
    margin-top: 20px;
  }
}
</style>
