<template>
  <div class="nft-bid-dialog">
    <ElDialog
      v-model="state.visible"
      :width="`${props.width ? props.width + 'px' : '684px'}`"
      custom-class="star-dialog-el"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="props.isClickModal"
      :modal="true"
      :show-close="false"
    >
      <template #title>
        <div class="nft-bid-dialog-header">
          <span>
            {{ $t("出售NFT") }}
          </span>
          <svg-icon
            v-if="state.isShowClose"
            name="dialog-close"
            class="svg"
            @click.stop="handleClose"
          ></svg-icon>
        </div>
      </template>
      <div class="nft-bid-dialog-content">
        <p>{{ $t(BID_DIALOG_PARAMS.label) }}</p>
        <div class="bid-type">
          <a
            v-for="(item, i) in BID_DIALOG_PARAMS.BIDTYPES"
            :key="i"
            @click="changeAction(i)"
            :class="state.typeIndex === i ? 'active' : ''"
          >
            {{ $t(item) }}
            <svg-icon
              name="bid-checked"
              class="svg"
              v-if="state.typeIndex === i"
            ></svg-icon>
          </a>
        </div>
        <div class="bid-content">
          <p>
            {{
              $t(
                state.typeIndex === 0
                  ? BID_DIALOG_PARAMS.FIXEDPRICE[0]
                  : BID_DIALOG_PARAMS.AUCTIONPRICE[0]
              )
            }}
          </p>
          <div class="bid-price">
            <star-input
              class="bid-price-input"
              :value="String(state.price || '')"
              @inputEvent="inputEvent"
              validateType="integer"
              max="999999999"
            >
            </star-input>
            <span>{{ $t(state.current_currency) }}</span>
          </div>
          <div v-if="state.errorInfo" class="error">
            *{{ $t("请输入价格") }}
          </div>
          <div class="bid-time" v-if="state.typeIndex === 1">
            <p>
              {{ $t(BID_DIALOG_PARAMS.AUCTIONPRICE[1]) }}
            </p>
            <star-selector
              :items="timeOptions"
              @emit="handleTime"
              :value="state.endDay"
              class="bid-time-change"
              :width="`100%`"
            ></star-selector>
          </div>
          <div class="bid-text">
            <p>{{ $t("说明") }}:</p>
            <p>{{ $t(BID_DIALOG_PARAMS.FIXEDTEXT) }}</p>
            <p>{{ $t(BID_DIALOG_PARAMS.AUCTIONTEXT) }}</p>
            <p>{{ $t(BID_DIALOG_PARAMS.FEETEXT) }}</p>
          </div>
        </div>
      </div>
      <div class="nft-bid-dialog-footer">
        <star-button
          @click="handleConfirm"
          class="nft-bid-dialog-footer-button"
          v-if="props.dialogParams.confirmText"
        >
          {{ props.dialogParams.confirmText }}
        </star-button>
      </div>
    </ElDialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, computed } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarButton from "@StarUI/StarButton.vue";
import { BID_DIALOG_PARAMS } from "@constants/dialog.js";
import StarInput from "@StarUI/StarInput.vue";
import StarSelector from "@StarUI/StarSelector.vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();

const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  isClickModal: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
  },
  isShowClose: {
    type: Boolean,
    default: true,
  },
  dialogParams: null,
});
const state = reactive({
  current_currency: computed(() => store.state.StoreNFTDetail.sell_currency), // 当前选择出售币种
  visible: props.dialogVisible,
  isShowClose: props.isShowClose,
  typeIndex: 0,
  price: "",
  endDay: 1,
  errorInfo: false,
});

watch(
  () => props.dialogVisible,
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

let timeOptions = [];
BID_DIALOG_PARAMS.TIME.map((i) => {
  timeOptions.push({ label: i + " " + t("天"), value: i });
});

const handleTime = (i) => {
  state.endDay = i.value;
};
const handleClose = () => {
  emits("handleClose");
};

const handleConfirm = () => {
  if (state.price === "") {
    state.errorInfo = true;
    return false;
  }
  emits("handleClose");
  let params = {};
  if (state.typeIndex === 0) {
    params = {
      type: state.typeIndex,
      price: state.price,
    };
  } else {
    params = {
      type: state.typeIndex,
      price: state.price,
      end_day: state.endDay,
    };
  }
  emits("handleConfirm", params);
};

const inputEvent = (val) => {
  if (val !== "") {
    state.errorInfo = false;
  }
  state.price = val;
};
const changeAction = (i) => {
  state.typeIndex = i;
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.nft-bid-dialog {
  ::v-deep(.el-dialog) {
    border-radius: 34px;
    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: $btn-orange-bgcolor;
    }
  }
  ::v-deep(.el-dialog__header) {
    padding-left: 42px !important;
  }
  ::v-deep(.el-dialog__body) {
    padding: 15px 28px 20px 42px !important;
  }

  .nft-bid-dialog-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    line-height: 36px;
    .svg {
      width: 36px;
      height: 36px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .nft-bid-dialog-content {
    p {
      font-size: 16px;
      color: #010e22;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .bid-type {
      width: 100%;
      overflow: hidden;
      margin-bottom: 24px;
      a {
        width: 298px;
        height: 48px;
        border: 1px solid #010e22;
        line-height: 48px;
        text-align: center;
        float: right;
        position: relative;
        border-radius: 5px;
        color: #010e22;
        &:first-child {
          float: left;
        }
        &:hover {
          cursor: pointer;
        }
        .svg {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .active {
        border: 1px solid #fb8000;
        color: #fb8000;
      }
    }
    .bid-price {
      border: 1px solid #ededed;
      height: 72px;
      margin-bottom: 10px;
      border-radius: 19px;
      .bid-price-input {
        width: 90%;
        line-height: 72px;
        font-size: 24px;
        font-weight: 500px;
        float: left;
        ::v-deep(.el-input__inner) {
          border: none;
          color: #000;
          border-radius: 19px;
        }
      }
      span {
        display: inline-block;
        line-height: 72px;
      }
    }
    .error {
      color: #fb8000;
      margin-bottom: 10px;
    }
    .bid-time {
      margin-top: 24px;
    }
    .bid-time-change {
      width: 100%;
      height: 72px;
      line-height: 72px;
      margin-bottom: 10px;
      ::v-deep(.el-select .el-input__inner) {
        height: 72px;
        border-radius: 19px;
        &:hover {
          border-color: #dcdfe6;
        }
      }
      ::v-deep(.el-select-dropdown__item.selected) {
        color: #000;
      }
    }
    .bid-text {
      p {
        font-size: 14px;
        color: #7f7f7f;
        margin-bottom: 2px;
        font-weight: normal;
      }
    }
  }

  .nft-bid-dialog-footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .nft-bid-dialog-footer-button {
      user-select: none;
      width: 100%;
      padding: 15px 15px;
      font-size: 16px;
      border-radius: 12px;
      background: #fb8000;
      color: #fff;
    }
  }
}
</style>
