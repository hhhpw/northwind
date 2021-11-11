/* eslint-disable */
import * as types from "../types/farms.js";
import FARMS_CONSTANTS from "@constants/farms.js";
import utilsFormat from "@utils/format";
import utilsNumber from "@utils/number";
import farmsAPI from "@api/farms.js";
import commonAPI from "@api/common.js";

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
    // 流动性挖矿
    inputDialogParams: FARMS_CONSTANTS.LIQUIDITY_INPUT_DIALOG_PARAMS,
    poolList: null,
    lpToken: "BTC/ETH",
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
    // 流动性
    [types.CHANGE_INPUT_DIALOG_PARAMS](state, payload) {
      state.inputDialogParams = Object.assign(
        {},
        state.inputDialogParams,
        payload
      );
    },
    [types.SET_CURR_LPTOKEN_INFO](state, payload) {
      // state. = payload;
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
        isMining: true,
        miningData: {
          draw: "2121",
          locked: utilsNumber.bigNum("2121").times(0.5).toString(),
        },
      });
      // 操作失败
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   dialogStatus: "failed",
      //  successBtnText: "确认",
      // });
    },
    // 提取swap锁仓收益
    swapDrawLockedProfit() {
      commit(types.CHANGE_SECOND_DIALOG_PARAMS, {
        dialogVisible: true,
        operateWaring: true,
        cancelText: "",
        lockedVisible: true,
        confirmText: "确认",
      });
    },

    // 提取流动性kiko收益
    drawLiquidityKIKOProfit({ commit }) {
      console.log("提取流动性stc收益");
      // secondDialogParams: FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS,
    },

    // 提取流动性LPTOKEN
    drawLiquidityLPToken({ commit }) {
      console.log("提取流动性LPTOKEN");
      commit(types.CHANGE_INPUT_DIALOG_PARAMS, {
        dialogVisible: true,
        lpToken: "ETH_SCT",
        type: "draw",
      });
    },
    // 获取用户流动性记录
    async getAllPoolListByUser({ commit, state }, payload) {
      const res = await commonAPI.getAllPoolListByUser(payload);
      if (res.result && res.result.resources) {
        console.log("res.result.resources", res.result.resources);
        console.log(
          "process.env.VUE_APP_LPTOKEN_ADDRESS",
          process.env.VUE_APP_LPTOKEN_ADDRESS
        );
        let data = 0;
        for (const [k, v] of Object.entries(res.result.resources)) {
          if (
            k.indexOf(
              `${process.env.VUE_APP_LPTOKEN_ADDRESS}::SwapPair::LPToken<`
            ) > -1
          ) {
            const contracts = k.match(/Balance<(.*)::SwapPair/)[1];
            if (contracts === process.env.VUE_APP_CONTRACTS_ADDRESS) {
              const tokenString = k.match(/LPToken<(.*)>>/)[1]; // 匹配LPToken开头、>>结束
              const tokenAddress = tokenString.split(", ");
              const tokens = tokenAddress.map((d) => d.split("::")[2]);
              const lpToken = `${tokens[0]}/${tokens[1]}`;
              console.log("tokens", lpToken);
              if (lpToken === state.lpToken) {
                data = v.json.token.value;
              }

              // console.log("tokens", tokens, tokenAddress);
              // if (v.json.token.value > 0) {
              //   list.push({
              //     lpToken: `LP - ${tokens[0]}/${tokens[1]}`,
              //     A: {
              //       key: tokens[0],
              //       data: "0.0",
              //       token: tokenAddress[0],
              //     },
              //     B: {
              //       key: tokens[1],
              //       data: "0.0",
              //       token: tokenAddress[1],
              //     },
              //     poolAmount: utilsNumber
              //       .bigNum(v.json.token.value)
              //       .div(Math.pow(10, 9))
              //       .toString(),
              //   });
              // }
            }
          }
        }
        commit(types.SET_LIQUIDITY_POOLLIST, data);
      } else {
        commit(types.SET_LIQUIDITY_POOLLIST, []);
      }
    },
  },
};

export default StoreFarms;
