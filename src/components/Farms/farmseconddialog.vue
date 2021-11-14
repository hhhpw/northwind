<template>
  <div class="farm-second-dialog">
    <ElDialog
      v-model="state.visible"
      :width="`${props.width ? props.width + 'px' : '440px'}`"
      custom-class="star-dialog-el"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal="true"
      :show-close="false"
    >
      <template #title>
        <div class="farm-second-dialog-header">
          <svg-icon
            v-if="state.isShowClose"
            name="dialog-close"
            class="svg"
            @click.stop="handleClose"
          ></svg-icon>
        </div>
      </template>
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
      <div class="farm-second-dialog-footer">
        <star-button
          @click="emits('handleConfirm')"
          class="farm-second-dialog-footer-button"
          type="green"
          v-if="props.dialogParams.confirmText"
        >
          {{ props.dialogParams.confirmText }}
        </star-button>
        <star-button
          type="red"
          class="farm-second-dialog-footer-button"
          @click="emits('handleCancel')"
          v-if="props.dialogParams.cancelText"
        >
          {{ props.dialogParams.cancelText }}
        </star-button>
      </div>
    </ElDialog>
  </div>
</template>

<script setup>
/* eslint-disable*/
import { reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index";
import StarButton from "@StarUI/StarButton";
import StarAmount from "@StarUI/StarAmount";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  width: {
    type: Number,
  },
  isShowClose: {
    type: Boolean,
    default: true,
  },
  dialogParams: null,
  // dialogParams.dataParams: {
  //   type: Object,
  //   default: () => {},
  // },
});
const state = reactive({
  visible: false,
  isShowClose: props.isShowClose,
});

watch(
  () => props.dialogParams && props.dialogParams.dialogVisible,
  (n) => {
    state.visible = n;
  }
);

watch(
  () => props.isShowClose,
  (n) => {
    state.isShowClose = n;
  }
);

const emits = defineEmits(["handleClose", "handleCancel", "handleConfirm"]);

const handleClose = () => {
  emits("handleClose");
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.farm-second-dialog {
  ::v-deep(.el-dialog) {
    border-radius: 34px;
    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: $btn-orange-bgcolor;
    }
  }
  ::v-deep(.el-dialog__body) {
    padding-top: 0px !important;
    // padding: 0px 0px 30px !important;
  }
  .star-dialog-el {
    ::v-deep(.el-dialog__header) {
      text-align: left !important;
    }
  }
  .farm-second-dialog-header {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    .svg {
      width: 36px;
      height: 36px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
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

  .farm-second-dialog-footer {
    width: 90%;
    margin-top: 30px;
    margin-left: 5%;
    display: flex;
    justify-content: space-around;
    .farm-second-dialog-footer-button {
      user-select: none;
      width: 70%;
      font-size: 16px;
      border-radius: 12px;
    }
  }
}
</style>
