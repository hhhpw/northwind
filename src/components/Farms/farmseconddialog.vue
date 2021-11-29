<template>
  <div class="farm-second-dialog">
    <star-second-dialog
      :dialogParams="props.dialogParams"
      @handleClose="emits('handleClose')"
      @handleConfirm="emits('handleConfirm')"
    >
      <template #custom-content>
        <div class="farm-second-dialog-content">
          <p class="farm-second-dialog-content-title">
            {{ $t("farms.farm-swap-draw-sure-title") }}
          </p>
          <p
            v-if="props.dialogParams.operateWaring"
            class="farm-second-dialog-content-error"
          >
            {{ $t("farms.farm-swap-draw-sure-error") }}
          </p>
          <div class="farm-second-dialog-content-block">
            <div
              class="farm-second-dialog-content-block-item"
              v-if="props.dialogParams?.dataParams?.draw"
            >
              <p class="farm-second-dialog-content-block-item-label">
                {{ $t("farms.farm-swap-draw") }}
              </p>
              <star-amount
                class="farm-second-dialog-content-block-item-amount"
                :value="props.dialogParams.dataParams.draw"
                :formatOptions="{ precision: 4, trailingZero: true }"
                displaySuffix="kiko"
              ></star-amount>
            </div>
            <div
              class="farm-second-dialog-content-block-item"
              v-if="props.dialogParams?.dataParams?.locked"
            >
              <p class="farm-second-dialog-content-block-item-label">
                {{ $t("farms.farm-swap-lock") }}
              </p>
              <star-amount
                class="farm-second-dialog-content-block-item-amount"
                :value="props.dialogParams.dataParams.locked"
                :formatOptions="{ precision: 4, trailingZero: true }"
                displaySuffix="kiko"
              ></star-amount>
            </div>
            <div
              class="farm-second-dialog-content-block-item"
              v-if="props.dialogParams?.dataParams?.gas"
            >
              <p class="farm-second-dialog-content-block-item-label">
                {{ $t("farms.farm-swap-draw-gas") }}
              </p>
              <star-amount
                class="farm-second-dialog-content-block-item-amount"
                :value="props.dialogParams.dataParams.gas"
                :formatOptions="{ precision: 4, trailingZero: true }"
                displaySuffix="kiko"
              ></star-amount>
            </div>
          </div>
        </div>
      </template>
    </star-second-dialog>
  </div>
</template>

<script setup>
import StarAmount from "@StarUI/StarAmount";
import StarSecondDialog from "@StarUI/StarSecondDialog.vue";

const props = defineProps({
  dialogParams: null,
});

const emits = defineEmits(["handleClose", "handleCancel", "handleConfirm"]);
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.farm-second-dialog {
  .farm-second-dialog-content {
    text-align: center;
    user-select: none;
    .farm-second-dialog-content-title {
      font-size: 20px;
      font-weight: 600;
      color: #010e22;
    }
    .farm-second-dialog-content-error {
      font-size: 16px;
      font-weight: 500;
      color: #f36346;
      margin-top: 10px;
    }
    .farm-second-dialog-content-block {
      margin-top: 20px;
      .farm-second-dialog-content-block-item {
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        .farm-second-dialog-content-block-item-label {
          font-weight: 400;
          color: #8b8b8b;
          font-size: 16px;
        }
        .farm-second-dialog-content-block-item-amount {
          color: #000928;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    img {
      width: 80%;
      border-radius: 16px;
    }
    p {
      // margin-top: 20px;
      font-size: 16px;
      color: #010e22;
      font-weight: 600;
    }
    .farm-second-dialog-content-gas {
      margin-top: 3px;
      font-size: 13px;
      color: #969696;
    }
  }
}
</style>
