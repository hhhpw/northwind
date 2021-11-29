<template>
  <div :class="$style['mining-core-container']">
    <total-power-card> </total-power-card>
    <my-power-card></my-power-card>
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
                store.commit('StoreNFTMining/SET_SECOND_DIALOG_PARAMS', {
                  imgParams: {
                    url: d.nft,
                    width: '120px',
                    height: '120px',
                  },
                  dialogVisible: true,
                  text: $t('确认'),
                  confirmText: $t('确认'),
                  cancelText: $t('取消'),
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
  <selector-dialog
    :dialogParams="state.selectorDialogParams"
    @handleClose="
      store.commit('StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS', {
        dialogVisible: false,
      })
    "
  ></selector-dialog>
  <star-wallet-dialog :dialogParams="state.walletDialogParams">
  </star-wallet-dialog>

  <star-second-dialog
    :dialogParams="state.secondDialogParams"
    @handleClose="
      store.commit(
        'StoreNFTMining/SET_SECOND_DIALOG_PARAMS',
        CONSTANTS_DIALOG.SECOND_DIALOG_PARAMS
      )
    "
    @handleConfirm="store.dispatch('StoreNFTMining/getNFTMiningProfit')"
    @handleCancel="
      store.commit(
        'StoreNFTMining/SET_SECOND_DIALOG_PARAMS',
        CONSTANTS_DIALOG.SECOND_DIALOG_PARAMS
      )
    "
  ></star-second-dialog>
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
import SelectorDialog from "./seletordialog.vue";
import TotalPowerCard from "./totalpowercard.vue";
import MyPowerCard from "./mypowercard.vue";
import StarWalletDialog from "@StarUI/StarWalletDialog.vue";
import changeSlotBgFunc from "./changeSlotBgFunc";
import StarButton from "@StarUI/StarButton.vue";
import StarSecondDialog from "@StarUI/StarSecondDialog.vue";
import CONSTANTS_DIALOG from "@constants/dialog.js";
import { useStore } from "vuex";
const store = useStore();

let state = reactive({
  slotDOMs: [],
  shadowDOMs: [],
  slotArrays: computed(() => store.state.StoreNFTMining.nftStakeList),
  selectorDialogParams: computed(
    () => store.state.StoreNFTMining.selectorDialogParams
  ),
  walletDialogParams: computed(
    () => store.state.StoreNFTMining.walletDialogParams
  ),
  secondDialogParams: computed(
    () => store.state.StoreNFTMining.secondDialogParams
  ),
  accounts: computed(() => store.state.StoreWallet.accounts),
});

const { enterNFTSlot, setSlotBg } = changeSlotBgFunc(state);

const clickSlotEvent = (hasNFT) => {
  if (hasNFT) return;
  store.commit("StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS", {
    dialogVisible: true,
  });
};

watchEffect(() => {
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
        border: 1px solid red;
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
            width: 122px;
            height: 122px;
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
