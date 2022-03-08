<template>
  <div
    :class="$style['compose-container']"
    class="compose-container"
    v-if="state.metaData"
  >
    <div :class="$style['role-box']">
      <div :class="$style['role-box-score']">
        <svg-icon name="f-rarity" style="margin-right: 3px"></svg-icon>
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
      <fly-space :size="20"></fly-space>
      <template v-if="state.walletStatus === 'connected'">
        <fly-button
          v-if="
            state.selectedElementList && state.selectedElementList.length > 0
          "
          :class="[$style['create-btn']]"
          @click="
            store.commit('StoreMeta/SET_CREATE_DIALOG_PARAMS', {
              dialogVisible: true,
            })
          "
        >
          {{ $t("下一步") }}
        </fly-button>
        <fly-button v-else type="disabled" :class="[$style['create-btn']]">
          {{ $t("下一步") }}
        </fly-button>
      </template>
      <template v-else>
        <fly-button @click="connectWallet" :class="[$style['create-btn']]">
          {{ $t("链接钱包") }}
        </fly-button>
      </template>
    </div>
  </div>
  <validate-error-modal></validate-error-modal>
</template>
<script setup>
/* eslint-disable */
import { computed, reactive, watch } from "vue";
import FlyButton from "@FlyUI/FlyButton.vue";
import FlyAmount from "@FlyUI/FlyAmount.vue";
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

<style lang="scss" module>
.compose-container {
  .role-box {
    position: relative;
    text-align: center;
    width: 426px;
    height: 436px;
    background: rgba(216, 216, 216, 0.2);
    margin: 0 auto;
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
      color: $theme-light-color;
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
    background: rgba(0, 0, 0, 0.4);
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
      width: 426px;
      padding: 0px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }
    .disabled {
      background: rgba(213, 213, 213, 1);
      color: rgba(172, 172, 172, 1);
    }
  }
}
</style>
