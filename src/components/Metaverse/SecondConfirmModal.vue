<template>
  <div :class="$style['metaverse-second-confirm']">
    <fly-second-dialog
      :dialogParams="state.secondDialogParams"
      @handleClose="state.secondDialogParams?.handleClose"
      @handleConfirm="state.secondDialogParams?.handleConfirm"
      @handleCancel="state.secondDialogParams?.handleCancel"
    >
      <template #custom-content>
        <div>
          <p>{{ $t("metaverse.whether to generate character NFT") }}</p>
          <p style="margin-top: 10px">
            {{
              $t("metaverse.casting cost", {
                amount: state.metaData.compositeFee,
                currency: "STC",
              })
            }}
          </p>
        </div>
      </template>
    </fly-second-dialog>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, reactive } from "vue";
import FlySecondDialog from "@FlyUI/FlySecondDialog.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  secondDialogParams: computed(() => store.state.StoreMeta.secondDialogParams),
  metaData: computed(() => store.state.StoreMeta.metaData),
});
</script>
<style lang="scss" module>
.metaverse-second-confirm {
  p {
    font-size: 20px;
    font-weight: 600;
    color: #000928;
  }
}
</style>
