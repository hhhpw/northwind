<template>
  <div class="farm-dialog">
    {{ props.dialogParams }}
    <star-wallet-dialog
      :dialogParams="props.dialogParams"
      @handleClose="emits('handleClose')"
      @handleFailed="emits('handleFailed')"
      @handleSucceed="emits('handleSucceed')"
    >
      <template #star-wallet-dialog-custom-content>
        <div class="farm-dialog-content-mining-success">
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
      </template>
    </star-wallet-dialog>
    <!-- <ElDialog
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
        <div class="farm-dialog-header">
          <svg-icon
            v-if="props.dialogParams.isShowClose"
            name="dialog-close"
            class="svg"
            @click.stop="handleClose"
          ></svg-icon>
        </div>
      </template>
      <div class="farm-dialog-content">
        <div class="farm-dialog-content-core">
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
            class="farm-dialog-content-core-text"
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
        <div class="farm-dialog-content-mining-success">
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
          class="farm-dialog-content-feedback"
          :style="{ width: setDiaglogStyle.feedBackWith }"
          v-if="props.dialogParams.dialogStatus === 'ongoing'"
        >
          <div
            :class="renderColorStyle(props.dialogParams.phase1)"
            class="farm-dialog-content-feedback-phase1"
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
            class="farm-dialog-content-feedback-phase2"
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
      <div class="farm-dialog-footer">
        <star-button
          @click="() => emits('handleSuccess')"
          class="farm-dialog-footer-button"
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
          class="farm-dialog-footer-button"
          @click="() => emits('handleFailed')"
          v-if="
            props.dialogParams.failedBtnText &&
            props.dialogParams.dialogStatus === 'failed'
          "
        >
          {{ props.dialogParams.failedBtnText }}
        </star-button>
      </div>
    </ElDialog> -->
  </div>
</template>

<script setup>
/* eslint-disable */
import { defineProps, defineEmits, reactive, computed } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarSpace from "@StarUI/StarSpace.vue";
import StarButton from "@StarUI/StarButton.vue";
import { useStore } from "vuex";
import dialogOnGoingImg from "../../assets/nft/confirm-logo.gif";
import dialogFailedImg from "../../assets/nft/dialog-error.png";
import dialogSuccessImg from "../../assets/nft/dialog-ok.png";
import dialogLoadingImg from "../../assets/nft/dialog-loading.png";
import dialogPhaseSuccessImg from "../../assets/nft/dialog-success.png";
import utilsNumber from "@utils/number";
import StarWalletDialog from "@StarUI/StarWalletDialog.vue";

const store = useStore();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  width: {
    type: Number,
  },
  dialogParams: {
    type: Object,
  },
});
const state = reactive({
  currLang: computed(() => store.state.StoreApp.currLang),
});

const emits = defineEmits(["handleClose", "handleSucceed", "handleFailed"]);

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

.farm-dialog {
  .farm-dialog-content-mining-success {
    color: #8b8b8b;
    text-align: center;
  }
}
</style>
