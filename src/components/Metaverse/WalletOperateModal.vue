<template>
  <star-wallet-dialog
    :dialogParams="state.dialogParams"
    @handleFailed="state.dialogParams?.handleFailed"
    @handleClose="state.dialogParams?.handleClose"
    @handleSucceed="state.dialogParams?.handleSucceed"
  >
    <template
      #star-wallet-dialog-custom-content
      v-if="state.dialogParams.isUseCustomContent"
    >
      <div>
        <p>{{ $t("metaverse.decomposed character cards succeed") }}</p>
        <p>{{ $t("获得") }}</p>
      </div>
    </template>
  </star-wallet-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarWalletDialog from "@StarUI/StarWalletDialog.vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  dialogParams: computed(() => store.state.StoreMeta.dialogParams),
});
</script>
<style lang="scss" module></style>
