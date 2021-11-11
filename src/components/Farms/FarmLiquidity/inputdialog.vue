<template>
  <div :class="$style['dialog-container']">
    <star-confirm
      :dialogVisible="state.visible"
      @handleClose="handleClose"
      :isCustomContent="true"
      :isCustomTitle="true"
      :title="state.title"
    >
      <template #core>
        <div :class="$style['dialog-container-core']">
          <div :class="$style['dialog-container-core-title']">
            <!-- <span v-if="A.disPlayBalance">
                {{ $t("余额") }}: {{ A.disPlayBalance }}
              </span> -->
            {{ $t("余额") }}: 31212
          </div>
          <div :class="$style['dialog-container-core-main']">
            <star-input
              class="dialog-container-core-main-input"
              placeholder="0.0"
              :value="22"
              :max="32131232"
              :precision="4"
              @inputEvent="inputEvent($event, 'from')"
            ></star-input>
            <div
              :class="$style['dialog-container-core-main-max']"
              @click="setToInputValueMax('from', A.disPlayBalance)"
            >
              Max
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <star-button class="confirm-btn" type="light" @click="handleConfirm">{{
          $t("确认")
        }}</star-button>
        <star-button class="confirm-btn" type="light" @click="handleConfirm">{{
          $t("确认")
        }}</star-button>
      </template>
    </star-confirm>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import StarInput from "@StarUI/StarInput";
import StarConfirm from "@StarUI/StarConfirm";
import StarButton from "@StarUI/StarButton";
import utilsFormat from "@utils/format";
const props = defineProps({
  dialogParams: {
    title: "",
    dialogVisible: false,
    lpToken: "STC_BTC",
  },
});

const state = reactive({
  visible: props.dialogParams && props.dialogParams.dialogVisible,
  title: "",
});

const handleClose = () => {
  console.log("A");
};

watch(
  () => props.dialogParams.dialogVisible,
  (n, o) => {
    state.visible = n;
  }
);
watchEffect(() => {
  if (props.dialogParams.type && props.dialogParams.lpToken) {
    let type =
      props.dialogParams.type === "draw"
        ? "farms.farm-liquidity-detail-dialog-draw-title"
        : "farms.farm-liquidity-detail-dialog-stake-title";
    state.title = utilsFormat.computedLangCtx(type, {
      token: props.dialogParams.lpToken,
    }).value;
  }
});
</script>
<style lang="scss" scoped>
.dialog-container-core-main-input {
  ::v-deep(.el-input__inner) {
    border-color: #fff !important;
    color: #000;
  }
  width: 300px;
}
</style>
<style lang="scss" module>
.dialog-container {
  .dialog-container-core {
    margin-top: 10px;
    height: 80px;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 19px;
    border: 1px solid #ededed;
    .dialog-container-core-title {
      text-align: right;
      font-size: 14px;
      font-weight: bold;
      color: #010e22;
    }
    .dialog-container-core-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      .dialog-container-core-main-input {
        ::v-deep(.el-input__inner) {
          border-color: #fff !important;
          color: #000;
        }
        width: 300px;
      }
      .dialog-container-core-main-max {
        color: $text-orange-color;
        font-size: 20px;
        margin-left: 6px;
        cursor: pointer;
      }
    }
  }
}
</style>
