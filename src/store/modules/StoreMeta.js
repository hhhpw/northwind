/* eslint-disable */
import * as types from "../types/meta.js";
import utilsFormat from "@utils/format";
import {
  WALLET_DIALOG_PARAMS,
  SECOND_DIALOG_PARAMS,
} from "@constants/dialog.js";
const INIT_SELECTOR_DIALOG_PARAMS = {
  dialogVisible: false,
  data: [],
};

const INIT_CALL_BACK_DIALOG_PARAMS = {
  dialogVisible: false,
  text: "",
};

const StoreMeta = {
  namespaced: true,
  moduleName: "StoreMeta",
  state: {
    secondDialogParams: SECOND_DIALOG_PARAMS,
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
    dialogParams: WALLET_DIALOG_PARAMS,
    callBackDialogParams: INIT_CALL_BACK_DIALOG_PARAMS,
    selectedElementList: ["31"],
    type: "generated", // generated not-generated
  },
  getters: {
    canGenerated: (state) => {
      if (state.selectedElementList.length > 0) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    [types.CHANGE_MAIN_STATUS](state, payload) {
      console.log("Payload", payload);
      state.type = payload;
    },
    [types.SET_SECOND_DIALOG_PARAMS_STATUS](state, payload) {
      state.secondDialogParams = Object.assign(
        {},
        state.secondDialogParams,
        payload
      );
    },
    [types.CHANGE_OPERATE_STATUS](state, payload) {
      state.type = payload;
    },
    [types.SET_SELECTOR_DIALOG_PARAMS](state, payload) {
      state.selectorDialogParams = Object.assign(
        {},
        state.selectorDialogParams,
        payload
      );
    },
    [types.SET_WALLET_DIALOG_PARAMS_STATUS](state, payload) {
      state.dialogParams = Object.assign({}, state.dialogParams, payload);
    },
    [types.SET_CALLBACK_DIALOG_PARAMS_STATUS](state, payload) {
      state.callBackDialogParams = Object.assign(
        {},
        state.callBackDialogParams,
        payload
      );
      console.log(
        "    state.callBackDialogParams ",
        state.callBackDialogParams
      );
    },
  },
  actions: {
    changeOperateStatus({ commit }, payload) {
      commit(types.CHANGE_OPERATE_STATUS, payload);
    },
    // 分解
    breakDownNFTRole({ commit }) {
      commit(types.SET_SELECTOR_DIALOG_PARAMS, { dialogVisible: false });
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogVisible: true,
      //   dialogText: utilsFormat.computedLangCtx(
      //     "metaverse.breaking down character cards"
      //   ),
      // });
      // 成功
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogVisible: true,
      //   dialogStatus: "succeed",
      //   isUseStatusImg: false,
      //   successBtnText: utilsFormat.computedLangCtx("确认"),
      //   isUseCustomContent: true,
      // });

      // 失败
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogVisible: true,
      //   dialogStatus: "failed",
      //   dialogText: utilsFormat.computedLangCtx(
      //     "metaverse.decomposed character cards failed"
      //   ),
      //   isUseCustomContent: false,
      //   failedBtnText: utilsFormat.computedLangCtx("确认"),
      // });
    },
    // 生成
    generateNFTRole({}) {
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogVisible: true,
      //   dialogText: utilsFormat.computedLangCtx(
      //     "metaverse.generating character cards"
      //   ),
      // });
      // // 成功
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogText: utilsFormat.computedLangCtx(
      //     "metaverse.generated character cards succeed"
      //   ),
      //   successBtnText: utilsFormat.computedLangCtx("确认"),
      // });
      // // 失败
      // commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
      //   dialogText: utilsFormat.computedLangCtx(
      //     "metaverse.generated character cards failed"
      //   ),
      //   failedBtnText: utilsFormat.computedLangCtx("确认"),
      // });
    },

    canCreateNFT({ commit, dispatch }) {
      const handleClose = () => {
        commit(types.SET_SECOND_DIALOG_PARAMS_STATUS, {
          dialogVisible: false,
        });
      };
      commit(types.SET_SECOND_DIALOG_PARAMS_STATUS, {
        dialogVisible: true,
        confirmText: utilsFormat.computedLangCtx("确认"),
        cancelText: utilsFormat.computedLangCtx("取消"),
        handleCancel: handleClose,
        handleClose: handleClose,
        handleConfirm: () => {
          dispatch("generateNFTRole");
        },
      });
    },
  },
};

export default StoreMeta;
