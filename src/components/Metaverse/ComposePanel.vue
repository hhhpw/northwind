<template>
  <div
    :class="$style['compose-container']"
    class="compose-container"
    v-if="state.metaData"
  >
    <star-space :size="15"></star-space>
    <div :class="$style['role-box']">
      <div :class="$style['role-box-score']">
        <svg-icon name="white-rarity" style="margin-right: 3px"></svg-icon>
        <star-amount
          :value="state.totalScore"
          :formatOptions="{ precision: 0, trailingZero: true }"
        >
        </star-amount>
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
    <star-space :size="20"></star-space>
    <div :class="$style['info-box']">
      <ElInput
        :placeholder="$t('metaverse.enter the name (0-10 English characters)')"
        v-model="state.nameValue"
      >
      </ElInput>
      <star-space :size="20"></star-space>
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
          :suffix-icon="selectSuffixIcon"
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
      <star-space :size="20"></star-space>
      <star-button
        v-if="state.walletStatus === 'connected'"
        :class="$style['create-btn']"
        :type="state.canGenerated ? 'dark' : 'disabled'"
        @click="validateParams(state.canGenerated)"
        >{{
          $t("metaverse.generate NFT character cards") + ` (29STC)`
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
import StarAmount from "@StarUI/StarAmount.vue";
import utilsFormat from "@utils/format";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarSpace from "@StarUI/StarSpace.vue";
import { useStore } from "vuex";
import connectLogic from "@mixins/wallet";
import utilsRegExp from "@utils/regexp.js";
import ValidateErrorModal from "./ValidateErrorModal.vue";

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

const selectSuffixIcon = () => {
  return <SvgIcon name="arrow-up-show"></SvgIcon>;
};

const validateParams = (flag) => {
  if (!flag) return;
  try {
    if (
      utilsRegExp.isChinese(state.nameValue) ||
      (state.nameValue && state.nameValue.length > 10) ||
      (state.nameValue && state.nameValue.length < 1) ||
      !state.nameValue
    ) {
      throw new Error("error");
    }
    const queryElementList = state.selectedElementList.map((d) => {
      const id = Object.values(d.chainNftIds)[0];
      return {
        id,
        eleName: d.name,
      };
    });
    store.dispatch("StoreMeta/canCreateNFT", {
      userAddress: state.accounts[0],
      customName: state.nameValue,
      sex: state.genderValue === "male" ? 1 : 0,
      occupation: state.professionValue,
      groupId: state.selectedElementList[0].groupId,
      elementList: queryElementList,
    });
  } catch (e) {
    store.commit("StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS", {
      dialogVisible: true,
      text: utilsFormat.computedLangCtx(
        "the role card name is 0-10 English characters or special symbols"
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
    background: $bgColor;
    border: none;
    color: $fontColor;
    height: 40px;
  }
  ::v-deep(.el-input__inner:focus) {
    border: none;
    border-color: transparent;
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: $fontColor;
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
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      color: $fontColor;
      background-color: rgba(235, 213, 189, 0.6);
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
    border: 1px solid red;
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
    }
  }
}
</style>
