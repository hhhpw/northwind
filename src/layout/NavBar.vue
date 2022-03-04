<template>
  <div class="fly-nav">
    <!-- <fly-button type="dark">
      {{ $t("链接钱包") }}
    </fly-button> -->

    <connect-wallet> </connect-wallet>
    <fly-drop-down
      :menus="state.languages"
      @clickEvent="changeLang"
      :activeValue="state.currLang"
    >
      <template #placeholder>
        <fly-button type="dark" class="lang">
          {{ lang }}
        </fly-button>
      </template>
    </fly-drop-down>
    <div class="fly-nav-setting" @click="changeSettingVisible(true)">
      <svg-icon name="f-setting"></svg-icon>
    </div>
    <fly-setting-dialog
      :dialogVisible="state.isShowSettings"
      @handleClose="changeSettingVisible(false)"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
// import { defineEmits } from "vue";
import FlyButton from "@FlyUI/FlyButton.vue";
import ConnectWallet from "@FlyUI/FlyConnectWallet.vue";
import FlyDropDown from "@FlyUI/FlyDropDown.vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import session from "@utils/session";
import FlySettingDialog from "@FlyUI/FlySettingDialog.vue";
import {
  computed,
  onMounted,
  reactive,
  defineProps,
  defineEmits,
  h,
  ref,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const store = useStore();

let state = reactive({
  languages: computed(() => store.state.StoreApp.languages),
  currLang: computed(() => store.state.StoreApp.currLang),
  isShowSettings: computed(() => store.state.StoreApp.isShowSettings),
});
const lang = computed(() => {
  return state.languages.filter((d) => d.value === state.currLang)[0].label;
});

let dialogVisible = ref(false);

const changeLang = (value) => {
  if (value !== state.currLang) {
    session.setItem("language", value);
    store.dispatch("StoreApp/changeLanguage", value);
    i18n.global.locale.value = value;
  }
};

const changeSettingVisible = (type) => {
  store.commit("StoreApp/CHANGE_SETTING_VISIBLE", type);
};
</script>

<style lang="scss" scoped>
.fly-nav {
  // position: fixed;
  top: 0;
  right: 30px;
  display: flex;
  position: absolute;
  align-items: center;
  height: 70px;
  z-index: 999;
  // background: #f9efe4;
  // width: calc(100% - 230px);
  justify-content: flex-end;
  .lang {
    margin-left: 25px;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    padding: 0 16px;
    width: 100px;
  }
  .fly-nav-setting {
    margin-left: 15px;
    width: 40px;
    height: 35px;
    background-color: $theme_gray_color;
    border-radius: 8px;
    text-align: center;
    line-height: 35px;
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
    ::v-deep(.el-dialog__header) {
      text-align: left !important;
    }
    ::v-deep(.setting) {
      p {
        text-align: left;
      }
    }
  }
}
</style>
