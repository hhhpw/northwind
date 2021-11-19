<template>
  <div :class="$style['dialog-container']">
    <star-confirm
      :dialogVisible="state.visible"
      :isShowClose="false"
      :isCustomContent="true"
      :isCustomTitle="true"
      :title="state.title"
    >
      <template #core>
        <div :class="$style['dialog-container-core']">
          <div :class="$style['dialog-container-core-title']">
            <span v-if="props.dataParams">
              {{ $t("余额") }}:
              <span>
                {{ props.dataParams?.value || 0 }}
              </span>
            </span>
          </div>
          <div :class="$style['dialog-container-core-main']">
            <star-input
              class="dialog-container-core-main-input"
              placeholder="0.0"
              :value="state.inputValue"
              :max="props.dataParams.value"
              :precision="9"
              @inputEvent="inputEvent($event)"
            ></star-input>
            <div
              :class="$style['dialog-container-core-main-max']"
              @click="setInputValueMax"
            >
              Max
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div :class="$style['dialog-container-footer']">
          <star-button
            :class="$style['dialog-container-footer-btn']"
            type="light"
            @click="handleCancel"
            >{{ $t("取消") }}</star-button
          >
          <star-button
            :class="$style['dialog-container-footer-btn']"
            :type="canConfirm ? 'dark' : 'disabled'"
            @click="handleConfirm(props?.dialogParams?.type)"
            >{{ $t("确认") }}</star-button
          >
        </div>
      </template>
    </star-confirm>
  </div>
</template>
<script setup>
import { computed, reactive, watch, watchEffect } from "vue";
import StarInput from "@StarUI/StarInput";
import StarConfirm from "@StarUI/StarConfirm";
import StarButton from "@StarUI/StarButton";
import utilsFormat from "@utils/format";

const props = defineProps({
  dialogParams: {
    title: "",
    dialogVisible: false,
    // lpToken: "STC_BTC",
  },
  dataParams: {
    value: "0.00",
  },
});

const emits = defineEmits(["handleCancel", "handleConfirm"]);

const inputEvent = (value) => {
  state.inputValue = value;
};
const setInputValueMax = () => {
  state.inputValue = props.dataParams.value;
};
const state = reactive({
  visible: props.dialogParams && props.dialogParams.dialogVisible,
  title: "",
  inputValue: "",
});

const handleCancel = () => {
  state.inputValue = "";
  emits("handleCancel");
};

const handleConfirm = (type) => {
  if (!canConfirm.value) return;
  emits("handleConfirm", type);
};

const canConfirm = computed(() => {
  return !!state.inputValue && props.dataParams?.value > 0;
});

watch(
  () => props.dialogParams.dialogVisible,
  (n) => {
    state.visible = n;
  }
);
watchEffect(() => {
  if (props.dialogParams.type && props?.dataParams?.token) {
    let type =
      props.dialogParams.type === "draw"
        ? "farms.farm-liquidity-detail-dialog-draw-title"
        : "farms.farm-liquidity-detail-dialog-stake-title";
    state.title = utilsFormat.computedLangCtx(type, {
      token: props.dataParams.token,
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
  .dialog-container-footer {
    display: flex;
    justify-content: space-around;
    .dialog-container-footer-btn {
      width: 120px;
    }
  }
}
</style>
