<template>
  {{ state.selectorDialogParams }}
  {{ state.walletDialogParams }}
  <selector-dialog
    :dialogParams="state.selectorDialogParams"
    @handleClose="
      store.commit('StoreNFTMining/SET_SELECTOR_DIALOG_PARAMS', {
        dialogVisible: false,
      })
    "
  ></selector-dialog>
  <star-wallet-dialog :dialogParams="state.walletDialogParams">
    <template #star-wallet-dialog-header-title> dasd </template>
  </star-wallet-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import SelectorDialog from "./seletordialog";
import StarWalletDialog from "@StarUI/StarWalletDialog";

import { useStore } from "vuex";
const store = useStore();

let state = reactive({
  selectorDialogParams: computed(
    () => store.state.StoreNFTMining.selectorDialogParams
  ),
  walletDialogParams: computed(
    () => store.state.StoreNFTMining.walletDialogParams
  ),
});
</script>
<style lang="scss" scoped></style>
