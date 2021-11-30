<template>
  <star-wallet-dialog
    :dialogParams="state.walletDialogParams"
    @handleFailed="state.walletDialogParams?.handleFailed"
    @handleClose="state.walletDialogParams?.handleClose"
    @handleSucceed="state.walletDialogParams?.handleSucceed"
  >
    <template #star-wallet-dialog-custom-content>
      <div style="text-align: center; color: #8b8b8b">
        <p v-if="state.walletDialogParams?.miningData?.draw">
          {{
            $t("提取{amount}{symbol}至钱包", {
              amount: formatAmount(state.walletDialogParams.miningData.draw),
              symbol: "KIKO",
            })
          }}
        </p>
        <star-space :size="20"></star-space>
      </div>
    </template>
  </star-wallet-dialog>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import StarWalletDialog from "@StarUI/StarWalletDialog.vue";
import utilsNumber from "@utils/number";
import StarSpace from "@StarUI/StarSpace.vue";
const store = useStore();
const state = reactive({
  walletDialogParams: computed(
    () => store.state.StoreNFTMining.walletDialogParams
  ),
});
const formatAmount = (amount) => {
  return utilsNumber.formatNumberMeta(utilsNumber.bigNum(amount), {
    precision: 4,
    trailingZero: true,
    round: "floor",
  }).text;
};
</script>
<style lang="scss" scoped></style>
