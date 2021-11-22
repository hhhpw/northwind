<template>
  <div :class="$style['card']" v-if="props">
    <div :class="$style['card-header']">
      <template v-if="props.lpToken">
        <img
          src="https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3bfe4edc-b91a-429a-eb5c-0a529fbb2200/public"
        />
        <img
          src="https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/771fed83-9d98-4be2-162d-b8639dfa6800/public"
        />
      </template>
      <template v-else>
        <img
          src="https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3bfe4edc-b91a-429a-eb5c-0a529fbb2200/public"
        />
      </template>
    </div>
    <div :class="$style['card-content']">
      <template v-if="!props.lpToken">
        <p>KIKO {{ $t("收益") }}</p>
        <star-amount
          :class="$style['card-content-amount']"
          :value="
            state.walletStatus !== 'connected' ? '0.00' : props.params?.value
          "
          :formatOptions="{
            precision: state.walletStatus !== 'connected' ? 2 : 4,
            trailingZero: true,
            grouped: true,
          }"
        ></star-amount>
      </template>
      <template v-else>
        <p v-if="props.params?.token">
          {{ props.params.token?.replace("_", "/") }} LP
        </p>
        <star-amount
          :class="$style['card-content-amount']"
          :value="
            state.walletStatus !== 'connected' ? '0.00' : props.params.value
          "
          :formatOptions="{
            precision:
              state.walletStatus !== 'connected' ? 2 : props.params.precision,
            trailingZero: true,
            grouped: true,
          }"
        ></star-amount>
      </template>
    </div>
    <div :class="$style['card-footer']">
      <template v-if="!props.lpToken">
        <star-button
          @click="kikoDraw"
          :class="$style['card-footer-longbtn']"
          :type="state.walletStatus !== 'connected' ? 'disabled' : 'light'"
          >{{ $t("提取") }}</star-button
        >
      </template>
      <template v-if="props.lpToken">
        <star-button
          :class="$style['card-footer-longbtn']"
          type="light"
          @click="() => connectWallet()"
          v-if="state.walletStatus !== 'connected'"
        >
          {{ $t("链接钱包") }}
        </star-button>
        <div v-else :class="$style['card-footer-short']">
          <star-button
            :class="$style['card-footer-shortbtn']"
            type="light"
            @click="lpTokenDraw"
          >
            {{ $t("提取") }}
          </star-button>
          <star-button
            :class="$style['card-footer-shortbtn']"
            type="light"
            @click="addLpToken"
          >
            {{ $t("添加") }}
          </star-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import StarAmount from "@StarUI/StarAmount";
import StarButton from "@StarUI/StarButton";
import { useStore } from "vuex";
import connectLogic from "@mixins/wallet";
const store = useStore();

const { connectWallet } = connectLogic(store);

let state = reactive({
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
});
const emits = defineEmits(["addLpToken", "lpTokenDraw", "stcDraw"]);
const props = defineProps({
  params: {
    type: () => {},
    default: {
      value: 0.0,
      precision: 2,
      token: "BTC_USDT",
      // imgA:
      // imgB:
      // img:
    },
  },
  lpToken: {
    type: Boolean,
    default: false,
  },
  // value: {
  //   type: [String, Number],
  //   default: "0",
  // },
  // token: {
  //   type: String,
  //   default: "BTC/STC",
  // },
});

const kikoDraw = () => {
  if (state.walletStatus !== "connected") return;
  if (props?.params?.value <= 0) {
    return;
  }
  emits("kikoDraw");
};

const lpTokenDraw = () => {
  if (state.walletStatus !== "connected") return;
  emits("lpTokenDraw");
};

const addLpToken = () => {
  if (state.walletStatus !== "connected") return;
  emits("addLpToken");
};
</script>
<style lang="scss" module>
.card {
  width: 340px;
  height: 268px;
  background: #ffffff;
  border-radius: 34px;
  padding: 40px 20px 30px;
  box-sizing: border-box;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent;
  }
  img + img {
    border: 2px solid #fff;
    position: relative;
    left: -10px;
  }
  .card-header {
    text-align: center;
  }
  .card-content {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    p {
      font-weight: bold;
      color: #000000;
      font-size: 16px;
    }
    .card-content-amount {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .card-footer {
    display: flex;
    justify-content: center;
    .card-footer-longbtn {
      width: 70%;
    }
    .card-footer-short {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .card-footer-shortbtn {
        padding: 15px 40px;
      }
    }
  }
}
</style>
