<template>
  <div :class="$style['mining-core-container']">
    <div :class="$style['mining-core-container-slot-wrap']">
      <div
        v-for="(d, i) in state.slotArrays"
        :key="i"
        :class="$style['mining-core-container-slot-item-wrap']"
        @mouseenter.stop="enterNFTSlot(i, d.hasNFT, true)"
        @mouseleave.stop="enterNFTSlot(i, d.hasNFT, false)"
      >
        <div
          :ref="
            (el) => {
              if (el) state.slotDOMs[i] = el;
            }
          "
          :style="setSlotBg(d.hasNFT)"
          :class="$style['mining-core-container-slot-item']"
        ></div>
      </div>
    </div>
  </div>
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
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import SelectorDialog from "./seletordialog";
import StarWalletDialog from "@StarUI/StarWalletDialog";
import NORMAL_IMG from "../../../assets/nft/mining-nft-slot.png";
import HOVER_IMG from "../../../assets/nft/mining-nft-slot-hover.png";
import NFT_IMG from "../../../assets/nft/mining-nft-slot-hasnft.png";
import changeSlotBgFunc from "./changeSlotBgFunc";

import { useStore } from "vuex";
const store = useStore();

let state = reactive({
  slotDOMs: [],
  slotArrays: new Array(5).fill(1).map((d, i) => {
    if (i === 2 || i === 4) {
      return {
        hasNFT: true,
      };
    }
    return {
      hasNFT: false,
    };
  }),
  selectorDialogParams: computed(
    () => store.state.StoreNFTMining.selectorDialogParams
  ),
  walletDialogParams: computed(
    () => store.state.StoreNFTMining.walletDialogParams
  ),
});

const { enterNFTSlot, setSlotBg } = changeSlotBgFunc(state);
</script>
<style lang="scss" module>
.mining-core-container {
  background-image: url("../../../assets/nft/nft-mining.png");
  background-repeat: no-repeat;
  // background-size: 100% 100%;
  background-size: contain;
  position: relative;
  // background-image: url("../../../assets/nft/nft-mining.png") center center
  //   no-repeat;
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
      }
    }
  }
}
</style>
