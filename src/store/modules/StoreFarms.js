/* eslint-disable */
import * as types from "../types/farms.js";
import FARMS_CONSTANTS from "@constants/farms.js";
import utilsFormat from "@utils/format";

const StoreFarms = {
  namespaced: true,
  moduleName: "StoreFarms",
  state: {
    dialogParams: FARMS_CONSTANTS.SWAP_DIALOG_PARAMS,
    secondDialogParams: FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS,
    swapPersonData: ["23412231.12", "23212", "23212"],
  },
  mutations: {
    [types.CHANGE_SECOND_DIALOG_PARAMS](state, payload) {
      state.secondDialogParams = Object.assign(
        {},
        state.secondDialogParams,
        payload
      );
    },
    [types.CHANGE_DIALOG_PARAMS](state, payload) {
      state.dialogParams = Object.assign({}, state.dialogParams, payload);
    },
  },
  actions: {
    swapDrawProfit({ state, commit }) {
      // 计算后可以提取
      // commit(types.CHANGE_SECOND_DIALOG_PARAMS, {
      //   dialogVisible: true,
      //   operateWaring: true,
      //   cancelText: "",
      //   lockedVisible: true,
      //   confirmText: "确认",
      // });
      // 计算后不可以提取
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   dialogVisible: true,
      //   dialogStatus: "failed",
      //   failedBtnText: "确认",
      //   dialogText: "操作失败",
      //   isShowClose: true,
      // });
      // 发起请求
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "ongoing",
      });
    },
  },
};

export default StoreFarms;
