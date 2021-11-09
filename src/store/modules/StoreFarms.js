/* eslint-disable */
import * as types from "../types/farms.js";
import FARMS_CONSTANTS from "@constants/farms.js";
import utilsFormat from "@utils/format";
import farmsAPI from "@api/farms.js";

const StoreFarms = {
  namespaced: true,
  moduleName: "StoreFarms",
  state: {
    dialogParams: FARMS_CONSTANTS.SWAP_DIALOG_PARAMS,
    secondDialogParams: FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS,
    swapPersonData: ["23412231.12", "23212", "23212"],
    swapPoolList: null,
    swapPersonData: [null, null, null],
    swapTotalData: [null, null, null, null],
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
    [types.SET_SWAP_POOL_LIST](state, payload) {
      state.swapPoolList = payload;
    },
    [types.SET_SWAP_PERSON_DATA](state, payload) {
      state.swapPersonData = [
        payload.freedReward,
        payload.lockedReward,
        payload.currentReward,
      ];
    },
    [types.SET_SWAP_TOTAL_DATA](state, payload) {
      state.swapTotalData = [
        payload.totalTradingAmount,
        payload.currentTradingAmount,
        payload.userCurrentTradingAmount,
        payload.dailyUserReward,
      ];
      console.log("swapTotalData", state.swapTotalData);
    },
  },
  actions: {
    async getTradingPoolList({ commit }, payload) {
      const res = await farmsAPI.getTradingPoolList(payload);
      if (res.code === 200) {
        commit(types.SET_SWAP_POOL_LIST, res.data);
      }
    },
    async getTradingReward({ commit }, payload) {
      const res = await farmsAPI.getTradingReward(payload);
      if (res.code === 200) {
        commit(types.SET_SWAP_PERSON_DATA, res.data);
      }
    },
    async getTradingMarket({ commit }, payload) {
      const res = await farmsAPI.getTradingMarket(payload);
      if (res.code === 200) {
        commit(types.SET_SWAP_TOTAL_DATA, res.data);
      }
    },
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
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   dialogVisible: true,
      //   dialogStatus: "ongoing",
      // });
      // 阶段一
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   phase1: "ongoing",
      // });
      // 阶段二
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   phase2: "ongoing",
      // });
      // 操作成功
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "success",
        isShowClose: true,
        dialogText: "操作成功",
        successBtnText: "确认",
      });
      // 操作失败
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   dialogStatus: "failed",
      // });
    },
  },
};

export default StoreFarms;
