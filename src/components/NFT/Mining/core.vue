<template>
  dasda
  {{ state.selectorDialogParams }}
  <selector-dialog :dialogParams="state.selectorDialogParams"></selector-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import SelectorDialog from "./seletordialog.vue";

import { useStore } from "vuex";
const store = useStore();

let state = reactive({
  selectorDialogParams: computed(
    () => store.state.StoreNFTMining.selectorDialogParams
  ),
});
</script>
<style lang="scss" scoped></style>
