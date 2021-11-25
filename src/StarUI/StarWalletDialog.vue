<template>
  <div class="star-wallet-dialog">
    <div>{{ props }}</div>

    <ElDialog
      v-model="state.visible"
      custom-class="star-dialog-el"
      width="480px"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal="true"
      :show-close="false"
    >
      <template #title>
        <div class="star-wallet-dialog-header">
          <slot name="star-wallet-dialog-header-title"></slot>
          <svg-icon
            v-if="props.dialogParams.isShowClose"
            name="dialog-close"
            class="star-wallet-dialog-header-svg"
            @click.stop="handleClose"
          ></svg-icon>
        </div>
      </template>
      <!--   <div class="star-wallet-dialog-content">
        <div class="star-wallet-dialog-content-core">
          <img
            style="border-radius: 16px"
            :src="renderContentImg(props.dialogParams.dialogStatus)"
            :style="setWH(props.dialogParams.dialogStatus)"
          />
          <star-space
            :size="15"
            v-if="props.dialogParams.dialogStatus !== 'ongoing'"
          ></star-space>
          <p
            class="star-wallet-dialog-content-core-text"
            v-if="props.dialogParams.dialogText"
          >
            {{
              props.dialogParams.dialogStatus === "ongoing"
                ? props.dialogParams.dialogText + "..."
                : props.dialogParams.dialogText
            }}
          </p>
        </div>
        <star-space
          :size="20"
          v-if="!props.dialogParams.customImgUrl"
        ></star-space>
        <div class="star-wallet-dialog-content-mining-success">
          <p v-if="props.dialogParams?.miningData?.draw">
            {{
              $t("farms.farm-swap-mining-success1", {
                amount: formatAmount(props.dialogParams.miningData.draw),
              })
            }}
          </p>
          <p v-if="props.dialogParams?.miningData?.locked">
            {{
              $t("farms.farm-swap-mining-success2", {
                amount: formatAmount(props.dialogParams.miningData.locked),
              })
            }}
          </p>
          <star-space :size="20"></star-space>
        </div>
        <div
          class="star-wallet-dialog-content-feedback"
          :style="{ width: setDiaglogStyle.feedBackWith }"
          v-if="props.dialogParams.dialogStatus === 'ongoing'"
        >
          <div
            :class="renderColorStyle(props.dialogParams.phase1)"
            class="star-wallet-dialog-content-feedback-phase1"
          >
            <img
              :src="renderPhaseStatus(props.dialogParams.phase1)"
              alt=""
              :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
              :class="rotateAni(props.dialogParams.phase1)"
            />
            <span>{{ $t("在钱包确认操作") }}</span>
          </div>
          <div
            class="star-wallet-dialog-content-feedback-phase2"
            :class="renderColorStyle(props.dialogParams.phase2)"
          >
            <img
              :src="renderPhaseStatus(props.dialogParams.phase2)"
              alt=""
              :style="{ marginLeft: setDiaglogStyle.loadingMarLeft }"
              :class="rotateAni(props.dialogParams.phase2)"
            />
            <span>{{ $t("请耐心等待网络确认") }}</span>
          </div>
        </div>
      </div>
      <div class="star-wallet-dialog-footer">
        <star-button
          @click="() => emits('handleSuccess')"
          class="star-wallet-dialog-footer-button"
          type="green"
          v-if="
            props.dialogParams.successBtnText &&
            props.dialogParams.dialogStatus === 'success'
          "
        >
          {{ props.dialogParams.successBtnText }}
        </star-button>
        <star-button
          type="red"
          class="star-wallet-dialog-footer-button"
          @click="() => emits('handleFailed')"
          v-if="
            props.dialogParams.failedBtnText &&
            props.dialogParams.dialogStatus === 'failed'
          "
        >
          {{ props.dialogParams.failedBtnText }}
        </star-button>
      </div> -->
    </ElDialog>
  </div>
</template>

<script setup>
// 公共的钱包操作反馈
/* eslint-disable */
import {
  defineProps,
  defineEmits,
  reactive,
  watch,
  computed,
  watchEffect,
} from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarSpace from "@StarUI/StarSpace.vue";
import StarButton from "@StarUI/StarButton.vue";
import { useStore } from "vuex";
import dialogOnGoingImg from "../assets/nft/confirm-logo.gif";
import dialogFailedImg from "../assets/nft/dialog-error.png";
import dialogSuccessImg from "../assets/nft/dialog-ok.png";
import dialogLoadingImg from "../assets/nft/dialog-loading.png";
import dialogPhaseSuccessImg from "../assets/nft/dialog-success.png";
import utilsNumber from "@utils/number";

const store = useStore();
const props = defineProps({
  dialogParams: {
    type: Object,
    default: () => {
      return {
        dialogVisible: false,
        isShowClose: false, // 弹窗关闭icon
      };
    },
  },
});
const state = reactive({
  currLang: computed(() => store.state.StoreApp.currLang),
  visible: false,
});
watchEffect(() => {
  if (props.dialogParams) {
    console.log("A");
    state.visible = props.dialogParams.dialogVisible;
  }
});
// watch(
//   () => props.dialogParams.dialogVisible,
//   (n, o) => {
//     console.log("n", n, "o,", o);
//     state.visible = n;
//   }
// );

const setDiaglogStyle = computed(() => {
  if (state.currLang === "en") {
    return {
      dialogWidth: "500px",
      feedBackWith: "440px",
      loadingMarLeft: "20px",
    };
  }
  return {
    dialogWidth: "440px",
  };
});

const renderContentImg = (type) => {
  const obj = {
    ongoing: dialogOnGoingImg,
    failed: dialogFailedImg,
    success: dialogSuccessImg,
  };
  return obj[type];
};

const renderPhaseStatus = (type) => {
  const obj = {
    loading: dialogLoadingImg,
    success: dialogPhaseSuccessImg,
  };
  return obj[type];
};

const setWH = (type, customImgUrl, isBlindBox) => {
  if (customImgUrl && isBlindBox) {
    return {
      width: "40%",
      "margin-bottom": "10px",
    };
  }
  if (customImgUrl) {
    return {
      width: "80%",
      "margin-bottom": "10px",
    };
  }
  if (type !== "ongoing") {
    return {
      width: "63px",
      // height: "56px",
    };
  }
  return {};
};

const rotateAni = (type) => {
  if (type === "loading") {
    return "loading-img";
  }
};

const renderColorStyle = (type) => {
  if (type === "loading") {
    return "loading-div";
  }
};

const emits = defineEmits(["handleClose", "handleSuccess", "handleFailed"]);

const handleClose = () => {
  emits("handleClose");
};

const formatAmount = (amount) => {
  return utilsNumber.formatNumberMeta(utilsNumber.bigNum(amount), {
    precision: 4,
    trailingZero: true,
    round: "floor",
  }).text;
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.star-wallet-dialog {
  ::v-deep(.el-dialog) {
    border-radius: 34px;
    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: $btn-orange-bgcolor;
    }
  }
  ::v-deep(.el-dialog__body) {
    padding-top: 10px !important;
  }
  .star-wallet-dialog-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    .star-wallet-dialog-header-svg {
      width: 36px;
      height: 36px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .star-wallet-dialog-content {
    // background: red;
    .star-wallet-dialog-content-core {
      text-align: center;
      img {
        display: inline-block;
        width: 140px;
        user-select: none;
      }
      .star-wallet-dialog-content-core-text {
        font-size: 20px;
        color: $text-black-color;
        font-weight: 600;
      }
    }
  }
  .star-wallet-dialog-content-mining-success {
    color: #8b8b8b;
    text-align: center;
  }
  .star-wallet-dialog-content-feedback {
    width: 323px;
    height: 109px;
    background: #fafafa;
    border-radius: 16px;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #000928;
      overflow: hidden;
      &.loading-div {
        color: #8b8b8b;
      }
      img {
        width: 14px;
        height: 14px;
        margin-left: 60px;
        display: inline-block;
      }
      span {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .loading-img {
      transition: 0.5s;
      animation: rotate 1s linear infinite;
    }
    .star-wallet-dialog-content-feedback-phase1 {
      margin-top: 30px;
    }
    .star-wallet-dialog-content-feedback-phase2 {
      margin-top: 10px;
    }
  }
  .star-wallet-dialog-footer {
    width: 100%;
    margin-top: 0px;
    .star-wallet-dialog-footer-button {
      padding-right: 0px;
      padding-left: 0px;
      width: 70%;
      margin-left: 15%;
      font-size: 16px;
      border-radius: 10px;
    }
  }
}
</style>
