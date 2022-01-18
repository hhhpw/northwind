<template>
  <div class="meta-nft-selector-modal">
    <ElDialog
      v-model="state.selectorDialogParams.dialogVisible"
      custom-class="star-dialog-el"
      width="868px"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal="true"
      :show-close="false"
    >
      <template #title>
        <div class="meta-nft-selector-modal-header">
          <div class="meta-nft-selector-modal-header-text">
            <p>{{ $t("metaverse.disassemble an nft") }}</p>
            <p style="margin-top: 5px">
              {{ $t("metaverse.disassemble an nft rule") }}
            </p>
          </div>
          <svg-icon
            name="dialog-close"
            class="meta-nft-selector-modal-header-svg"
            @click.stop="handleClose"
          ></svg-icon>
        </div>
      </template>

      <div
        v-if="state.allSplitNFT && state.allSplitNFT.length > 0"
        class="card-wrap"
      >
        <div
          v-for="(d, i) in state.allSplitNFT"
          :key="i"
          class="card-wrap-item"
          @mouseenter="changeBtnStatus(i, true)"
          @mouseleave="changeBtnStatus(i, false)"
        >
          <div class="card-wrap-item-box">
            <img :src="d.image" />
            <div class="card-wrap-item-box-shadow">
              <svg-icon
                name="white-rarity"
                class="card-wrap-item-box-svg"
              ></svg-icon>
              <star-amount
                :value="d?.score"
                :formatOptions="{ precision: 0, trailingZero: false }"
              ></star-amount>
            </div>
          </div>
          <p class="card-wrap-item-text">
            {{ d.customName }}
          </p>
          <div v-show="d.isShow">
            <star-button
              type="dark"
              class="card-wrap-item-btn"
              @click="brakeDownNFT(d)"
              >{{ $t("metaverse.disassemble") }}</star-button
            >
          </div>
        </div>
      </div>
      <div class="no-nft-data" v-else>
        <img src="../../assets/metaverse/no-nft-data.png" />
        <p style="color: #8b8b8b">
          {{ $t("metaverse.no NFT available") }}
        </p>
        <p class="no-nft-data-link" @click="pushMarket">
          {{ $t("metaverse.please go to the market") }}
        </p>
      </div>
    </ElDialog>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watchEffect } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarButton from "@StarUI/StarButton.vue";
import StarAmount from "@StarUI/StarAmount.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  visible: true,
  selectorDialogParams: computed(
    () => store.state.StoreMeta.selectorDialogParams
  ),
  allSplitNFT: computed(() => store.state.StoreMeta.allSplitNFT),
});
const emits = defineEmits(["handleClose", "handleSuccess", "handleFailed"]);

const handleClose = () => {
  store.commit("StoreMeta/SET_SELECTOR_DIALOG_PARAMS", {
    dialogVisible: false,
  });
};

const brakeDownNFT = (data) => {
  store.dispatch("StoreMeta/breakDownNFTRole", data);
};

const changeBtnStatus = (index, flag) => {
  state.allSplitNFT[index].isShow = flag;
};
</script>
<style lang="scss" scoped>
.meta-nft-selector-modal {
  ::v-deep(.el-dialog) {
    border-radius: 8px;
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

  .meta-nft-selector-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    .meta-nft-selector-modal-header-text {
      p:first-child {
        font-weight: 500;
        color: #391b0f;
        font-size: 20px;
      }
      p:last-child {
        font-size: 14px;
        color: #8b8b8b;
      }
    }
    .meta-nft-selector-modal-header-svg {
      width: 30px;
      height: 30px;
    }
  }
  .nft-mining-selector-empty-link {
    color: rgb(251, 128, 0);
    border-bottom: 1px dashed rgb(251, 128, 0);
    cursor: pointer;
  }
  .card-wrap {
    display: flex;
    flex-wrap: wrap;
    max-height: 60vh;
    height: 60vh;
    overflow: scroll;

    .card-wrap-item {
      padding: 24px 20px;
      margin-bottom: 15px;
      margin-left: 14px;
      text-align: center;
      border: 2px solid transparent;
      // width: 120px;
      height: 220px;
      &:hover {
        border: 2px solid #ff9534;
        cursor: pointer;
      }
      .card-wrap-item-box {
        position: relative;
        width: 144px;
        height: 144px;
        img {
          width: 144px;
          height: 144px;
          border-radius: 8px;
        }
        .card-wrap-item-box-shadow {
          position: absolute;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          color: #fff;
          width: 60px;
          bottom: 10px;
          left: 42px;
          .card-wrap-item-box-svg {
            font-size: 12px;
          }
          span {
            margin-left: 5px;
            font-size: 12px;
          }
        }
      }
      .card-wrap-item-text {
        font-size: 14px;
        color: #391b0f;
        text-align: center;
        text-align: left;
        margin-left: 5px;
        margin-top: 10px;
      }
      .card-wrap-item-btn {
        margin-top: 10px;
        width: 120px;
        padding: 8px;
        border-radius: 5px;
        font-size: 14px;
      }
    }
  }
  .no-nft-data {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 60vh;
    img {
      display: inline-block;
      margin-bottom: 20px;
      width: 110px;
      height: 110px;
    }
    .no-nft-data-link {
      color: rgb(251, 128, 0);
      border-bottom: 1px dashed rgb(251, 128, 0);
      cursor: pointer;
    }
  }
}
</style>
