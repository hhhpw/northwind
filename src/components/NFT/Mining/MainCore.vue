<template>
  <div :class="$style['mining-core-container']">
    <total-power-card> </total-power-card>
    <user-power-card></user-power-card>
    <div :class="$style['mining-core-container-slot-wrap']">
      <div
        v-for="(d, i) in state.slotArrays"
        :key="i"
        :class="$style['mining-core-container-slot-item-wrap']"
        @mouseenter.stop="enterNFTSlot(i, d.hasNFT, true)"
        @mouseleave.stop="enterNFTSlot(i, d.hasNFT, false)"
        @click.stop="clickSlotEvent(d.hasNFT)"
      >
        <div
          :ref="
            (el) => {
              if (el) state.slotDOMs[i] = el;
            }
          "
          :style="setSlotBg(d.hasNFT)"
          :class="$style['mining-core-container-slot-item']"
        >
          <div :class="$style['mining-core-container-slot-item-img-box']">
            <div
              :class="$style['mining-core-container-slot-item-img-box-tl']"
            ></div>
            <div
              :class="$style['mining-core-container-slot-item-img-box-tr']"
            ></div>
            <div
              :class="$style['mining-core-container-slot-item-img-box-bl']"
            ></div>
            <div
              :class="$style['mining-core-container-slot-item-img-box-br']"
            ></div>
            <img :src="d?.imageLink" v-if="d?.imageLink" />
            <div
              :class="$style['mining-core-container-slot-item-img-box-desc']"
              v-if="d?.imageLink"
            >
              <svg-icon name="mininglight" style="margin-right: 5px"></svg-icon>
              <!-- <span>{{ $t("算力") }}: </span> -->
              <star-amount
                :value="d.score"
                :formatOptions="{ precision: 2, trailingZero: true }"
              ></star-amount>
            </div>
          </div>
          <div
            :ref="
              (el) => {
                if (el) state.shadowDOMs[i] = el;
              }
            "
            :class="$style['mining-core-container-slot-item-shadow-box']"
          >
            <star-button
              type="dark"
              :class="$style['mining-core-container-slot-item-shadow-box-btn']"
              @click.stop.prevent="
                store.dispatch('StoreNFTMining/removeNFT', {
                  imageLink: d.imageLink,
                  nftName: d.name,
                })
              "
              >{{ $t("移除") }}</star-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <p :class="$style['mining-slot-desc']">
    {{ $t("nftmining.nft-slot-desc") }}
  </p>
  <selector-modal
    :dialogParams="state.selectorDialogParams"
    @handleClose="
      store.commit('StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS', {
        dialogVisible: false,
      })
    "
  ></selector-modal>
  <reward-dialog></reward-dialog>
  <second-dialog></second-dialog>
</template>
<script setup>
/* eslint-disable */
import {
  computed,
  onMounted,
  reactive,
  defineProps,
  defineEmits,
  watchEffect,
} from "vue";
import SelectorModal from "./SelectorModal.vue";
import TotalPowerCard from "./TotalCard.vue";
import UserPowerCard from "./UserPowerCard.vue";
import changeSlotBgFunc from "./changeSlotBgFunc";
import StarButton from "@StarUI/StarButton.vue";
import CONSTANTS_DIALOG from "@constants/dialog.js";
import SecondDialog from "./SecondDialog.vue";
import RewardDialog from "./RewardDialog.vue";
import { useStore } from "vuex";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarAmount from "@StarUI/StarAmount.vue";
const store = useStore();

let state = reactive({
  slotDOMs: [],
  shadowDOMs: [],
  slotArrays: computed(() => store.state.StoreNFTMining.nftStakeList),
  selectorDialogParams: computed(
    () => store.state.StoreNFTMining.selectorDialogParams
  ),
  accounts: computed(() => store.state.StoreWallet.accounts),
  currLang: computed(() => store.state.StoreApp.currLang),
});

const { enterNFTSlot, setSlotBg } = changeSlotBgFunc(state);

const clickSlotEvent = (hasNFT) => {
  if (hasNFT) return;
  store.commit("StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS", {
    dialogVisible: true,
  });
};

watchEffect(async () => {
  store.dispatch("StoreNFTMining/getMiningData");
  if (state.accounts && state.accounts[0]) {
    store.dispatch("StoreNFTMining/getStakeNFTList", state.accounts[0]);
  }
});

// const removeNFT = (d) => {
//   const { nft } = d;
//   store.commit("StoreNFTMining/SET_SECOND_DIALOG_PARAMS", {
//     imgUrl: d.nft,
//   });
// };
</script>
<style lang="scss" module>
@mixin corner {
  position: absolute;
  height: 20px;
  width: 20px;
  // background: red;
  // background: #ecdfce;
  transform: rotate(45deg);
  // border: transparent;
}
.mining-core-container {
  background-image: url("../../../assets/nft/nft-mining.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  width: 900px;
  height: 540px;
  .mining-core-container-slot-wrap {
    position: absolute;
    bottom: 0px;
    .mining-core-container-slot-item-wrap {
      :hover {
        cursor: pointer;
      }
      position: relative;
      float: left;
      height: 182px;
      background: transparent;
      width: 180px;
      .mining-core-container-slot-item {
        height: 180px;
        background: transparent;
        width: 178px;
        position: relative;
        left: 50%;
        // background-image: url("../../../assets/nft/mining-nft-slot.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        top: 50%;
        // bottom: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        .mining-core-container-slot-item-img-box {
          width: 132px;
          height: 132px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -51%);
          .mining-core-container-slot-item-img-box-tl {
            @include corner();
            top: -10px;
            left: -10px;
            // top: -2px;
            // left: -3px;
          }
          .mining-core-container-slot-item-img-box-tr {
            @include corner();
            // top: -10px;
            right: -0px;
          }
          .mining-core-container-slot-item-img-box-bl {
            @include corner();
            bottom: -10px;
            left: -10px;
          }
          .mining-core-container-slot-item-img-box-br {
            @include corner();
            bottom: -10px;
            right: -10px;
          }
          .mining-core-container-slot-item-img-box-desc {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              #000000 100%
            );
            opacity: 0.74;
            width: 132px;
            padding: 2px 0px;
            color: #fff;
            font-size: 12px;
            position: absolute;
            bottom: 0px;
            // left: 6px;
          }
          //   width: 120px;
          //   height: 150px;
          //   background: linear-gradient(-45deg, transparent 15px, aqua 0) bottom
          //       right,
          //     linear-gradient(45deg, transparent 15px, aqua 0) bottom left,
          //     linear-gradient(135deg, transparent 15px, aqua 0) top left,
          //     linear-gradient(-135deg, transparent 15px, aqua 0) top right;
          //   background-size: 50% 50%;
          //   background-repeat: no-repeat;
          //   overflow: hidden;
          //   border: 1px solid pink;
          //   background-image: url("https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/724fcf0b-42a2-47b3-31f7-1c2e6a150b00/public");
          img {
            width: 132px;
            height: 132px;
            border: none;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .mining-core-container-slot-item-shadow-box {
          width: 132px;
          height: 132px;
          position: absolute;
          left: 50%;
          top: 50%;
          background-color: rgba(0, 0, 0, 0.8);
          transform: translate(-50%, -51%);
          display: none;
          .mining-core-container-slot-item-shadow-box-btn {
            padding: 5px 15px;
            font-size: 16px;
            left: 50%;
            position: relative;
            transform: translate(-50%, 0%);
            margin-top: 20px;
            font-weight: normal;
            // margin: 10px auto;
          }
        }
      }
    }
  }
}
.mining-slot-desc {
  font-weight: 600;
  color: #8b8b8b;
  font-size: 14px;
  margin-top: 30px;
}
</style>
