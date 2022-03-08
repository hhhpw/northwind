<template>
  <fly-wallet-dialog
    :dialogParams="state.dialogParams"
    @handleFailed="state.dialogParams?.handleFailed"
    @handleClose="state.dialogParams?.handleClose"
    @handleSucceed="state.dialogParams?.handleSucceed"
  >
    <template
      #star-wallet-dialog-custom-content
      v-if="state.dialogParams.isUseCustomContent"
    >
      <div class="break-down-nft-content">
        <p style="positive: relative; top: -15px">{{ $t("获得") }}</p>
        <div v-for="(d, i) in state.dialogParams.customContent" :key="i">
          <span>{{ d.key }}</span>
          <span>{{ d.value }}</span>
        </div>
      </div>
    </template>
  </fly-wallet-dialog>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import FlyWalletDialog from "@FlyUI/FlyWalletDialog.vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  dialogParams: computed(() => store.state.StoreMeta.dialogParams),
});
</script>
<style lang="scss" scoped>
.break-down-nft-content {
  padding: 0px 60px;
  p,
  span {
    text-align: center;
    color: #969696;
    font-size: 16px;
  }
  div {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    span + span {
      color: #000;
    }
  }
  div:last-child {
    margin-bottom: 20px;
  }
}
</style>
