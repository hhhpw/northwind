<template>
  <div
    :class="$style['compose-container']"
    class="compose-container"
    v-if="state.metaData"
  >
    <fly-space :size="15"></fly-space>
    <div :class="$style['role-box']">
      <div :class="$style['role-box-score']">
        <svg-icon name="white-rarity" style="margin-right: 3px"></svg-icon>
        <fly-amount
          :value="state.totalScore"
          :formatOptions="{ precision: 0, trailingZero: true }"
        >
        </fly-amount>
      </div>
      <!-- <img src="../../assets/metaverse/right-empty-box.png" /> -->
      <template
        v-if="state.selectedElementList && state.selectedElementList.length > 0"
      >
        <img
          v-for="(d, i) in state.selectedElementList"
          :src="d.image"
          :key="i"
          :style="{ zIndex: d.maskOrder }"
        />
      </template>
    </div>
    <fly-space :size="20"></fly-space>
    <div :class="$style['info-box']">
      <ElInput
        :placeholder="$t('metaverse.enter the name (1-10 English characters)')"
        v-model="state.nameValue"
      >
      </ElInput>
      <fly-space :size="20"></fly-space>
      <div :class="$style['detail-info']" class="detail-info">
        <div :class="$style['role-gender']">
          <div
            v-for="(d, i) in state.genderLabels"
            :key="i"
            @click="selectGender(d)"
            :class="[
              $style['role-gender-item'],
              $style[`role-gender-${d}`],
              $style[state.genderValue === d ? 'selected-gender' : ''],
            ]"
          >
            <svg-icon :name="d"></svg-icon>
          </div>
        </div>
        <ElSelect
          v-model="state.professionValue"
          :suffix-icon="SelectSuffix"
          :popper-append-to-body="false"
        >
          <ElOption
            v-for="d in state.metaData.occupations"
            :key="d.value"
            :label="state.currLang === 'zh' ? d.cnDesc : d.desc"
            :value="d.value"
          ></ElOption>
        </ElSelect>
      </div>
      <fly-space :size="20"></fly-space>
      <star-button
        v-if="state.walletStatus === 'connected'"
        :class="[
          $style['create-btn'],
          $style[!state.canGenerated ? 'disabled' : ''],
        ]"
        :type="state.canGenerated ? 'dark' : ''"
        @click="validateParams(state.canGenerated)"
        :style="{
          'font-size': state.currLang === 'zh' ? '15px' : '13px',
        }"
        >{{
          $t("metaverse.generate character NFT") +
          ` (${state.metaData.compositeFee}) STC`
        }}</star-button
      >
      <star-button
        v-if="state.walletStatus !== 'connected'"
        :class="$style['create-btn']"
        type="dark"
        @click="connectWallet"
        >{{ $t("链接钱包") }}</star-button
      >
    </div>
  </div>
  <validate-error-modal></validate-error-modal>
</template>
<script setup>
/* eslint-disable */
import { computed, reactive, watch } from "vue";
import StarButton from "@StarUI/StarButton.vue";
import FlyAmount from "@FlyUI/FlyAmount";
import utilsFormat from "@utils/format";
import SvgIcon from "@components/SvgIcon/Index.vue";
import FlySpace from "@FlyUI/FlySpace.vue";
import { useStore } from "vuex";
import connectLogic from "@hooks/useMyWallet";
import utilsRegExp from "@utils/regexp.js";
import ValidateErrorModal from "./ValidateErrorModal.vue";
import SelectSuffix from "@components/SelectSuffix.vue";
const store = useStore();
const { connectWallet } = connectLogic(store);

const state = reactive({
  metaData: computed(() => store.state.StoreMeta.metaData),
  walletStatus: computed(() => store.state.StoreWallet.walletStatus),
  currLang: computed(() => store.state.StoreApp.currLang),
  canGenerated: computed(() => store.getters["StoreMeta/canGenerated"]),
  totalScore: computed(() => store.getters["StoreMeta/totalScore"]),
  accounts: computed(() => store.state.StoreWallet.accounts),
  selectedElementList: computed(
    () => store.state.StoreMeta.selectedElementList
  ),
  genderLabels: ["male", "female"],
  genderValue: "male",
  nameValue: "",
  professionValue: "Adventurer",
});

const selectGender = (gender) => {
  state.genderValue = gender;
};

const validateParams = (flag) => {
  if (!flag) return;
  try {
    if (
      utilsRegExp.isChinese(state.nameValue) ||
      (state.nameValue && state.nameValue.length > 20) ||
      (state.nameValue && state.nameValue.length < 1) ||
      !state.nameValue
    ) {
      throw new Error("error");
    }
    store.dispatch("StoreMeta/canCreateNFT", {
      userAddress: state.accounts[0],
      customName: state.nameValue,
      sex: state.genderValue === "male" ? 1 : 0,
      occupation: state.professionValue,
      groupId: state.selectedElementList[0].groupId,
      elementList: state.selectedElementList,
    });
  } catch (e) {
    store.commit("StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS", {
      dialogVisible: true,
      text: utilsFormat.computedLangCtx(
        "the role card name is 1-10 English characters or special symbols"
      ),
    });
  }
};
const handleValidateClose = () => {
  // state.errorDialogVisible = false;
};
</script>

<style lang="scss" scoped>
$bgColor: rgba(235, 213, 189, 1);
$borderColor: #ebd5bd;
$fontColor: #391b0f;
$bgColor2: #fcf7f1;

.compose-container {
  ::v-deep(.el-input) {
    border: none;
    border-color: transparent;
    width: 245px;
    height: 40px;
  }
  ::v-deep(.el-input::hover) {
    border: none;
    border-color: transparent;
  }
  ::v-deep(.el-input__inner) {
    background: #f3e6d7;
    border: none;
    color: $fontColor;
    height: 40px;
  }
  ::v-deep(.el-input__inner:focus) {
    border: none;
    border-color: transparent;
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: rgba(57, 27, 15, 0.4);
    font-size: 10px;
    // transform: scale(0.8);
    // margin-left: 100px;
  }
}
.detail-info {
  ::v-deep(.el-input) {
    border: none;
    width: 130px;
    border: 1px solid $borderColor;
    border-radius: 8px;
    overflow: hidden;
    background-color: $bgColor2;
    height: 32px;
  }
  ::v-deep(.el-input::hover) {
    border: 1px solid $borderColor;
  }
  ::v-deep(.el-input__inner) {
    background: #fff;
    height: 32px;
    color: $fontColor;
    background-color: $bgColor2;
  }
  ::v-deep(.el-input__inner:focus) {
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: $fontColor;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]) {
    border: none;
  }
  ::v-deep(.el-select-dropdown) {
    background-color: #fcf7f1;
    border: none;
    .el-select-dropdown__item.selected {
      color: $fontColor;
      background-color: $borderColor;
    }
    .el-select-dropdown__item.hover {
      color: $fontColor;
      background-color: rgba(235, 213, 189, 0.6) !important;
    }
    .el-select-dropdown__item:hover {
      color: $fontColor;
      background-color: rgba(235, 213, 189, 0.3);
    }
  }
  ::v-deep(.el-popper.is-light .el-popper__arrow::before) {
    background-color: $bgColor2;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]
      .el-popper__arrow::before) {
    border: none;
  }
}
</style>
<style lang="scss" module>
.compose-container {
  background-image: url("../../assets/metaverse/right-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 400px;
  margin-left: 30px;
  padding: 30px 45px;
  box-sizing: border-box;
  .role-box {
    position: relative;
    width: 304px;
    text-align: center;
    height: 304px;
    margin: 0 auto;
    border: 1px dashed rgba(251, 128, 0, 0.52);
    .role-box-score {
      z-index: 99;
      min-width: 62px;
      height: 24px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 16px;
      position: absolute;
      padding: 0px 5px;
      right: 5px;
      top: 5px;
      line-height: 24px;
      color: #fff;
      font-size: 14px;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .detail-info {
      display: flex;
      width: 245px;
      justify-content: space-between;
      .role-gender {
        display: flex;
        .role-gender-item {
          width: 40px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border: 1px solid #f3e6d7;
          transition: all ease 0.2s;
          color: #391b0f;
          &.selected-gender {
            background: #fb8000;
            color: #ffffff;
          }
        }
        .role-gender-male {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: none;
        }
        .role-gender-female {
          background: #fcf7f1;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
    .create-btn {
      width: 245px;
      padding: 0px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
    }
    .disabled {
      background: rgba(213, 213, 213, 1);
      color: rgba(172, 172, 172, 1);
    }
  }
}
</style>
