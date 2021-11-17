/* eslint-disable */
import * as types from "../types/farms.js";
import FARMS_CONSTANTS from "@constants/farms.js";
import utilsFormat from "@utils/format";
import utilsNumber from "@utils/number";
import farmsAPI from "@api/farms.js";
import commonAPI from "@api/common.js";
import utilsTool from "@utils/tool.js";

const StoreFarms = {
  namespaced: true,
  moduleName: "StoreFarms",
  state: {
    dialogParams: FARMS_CONSTANTS.SWAP_DIALOG_PARAMS,
    secondDialogParams: FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS,
    swapPoolList: null,
    swapPersonData: [null, null, null],
    swapTotalData: [null, null, null, null],
    swapMiningDrawGas: null, // 提取费用
    // 流动性挖矿
    inputDialogParams: FARMS_CONSTANTS.LIQUIDITY_INPUT_DIALOG_PARAMS,
    poolList: null,
    lpTokenInfo: {}, // {token: , value:}
    liquidityDrawData: null, // 可提取的kiko
    totalStakeAmount: null,
  },
  mutations: {
    [types.SET_LIQUIDITY_TOTAL_STAKE_AMOUNT](state, payload) {
      state.totalStakeAmount = payload;
    },
    [types.SET_LIQUIDITY_DRAW_DATA](state, payload) {
      state.liquidityDrawData = payload;
    },
    [types.SWAP_MINING_DRAW_GAS](state, payload) {
      state.swapMiningDrawGas = payload;
    },
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
        payload.currentReward,
        payload.lockedReward,
        payload.freedReward,
      ];
    },
    [types.SET_SWAP_TOTAL_DATA](state, payload) {
      state.swapTotalData = [
        payload.totalTradingAmount,
        payload.currentTradingAmount,
        payload.userCurrentTradingAmount,
        payload.dailyUserReward,
      ];
    },
    // 流动性
    [types.SET_LIQUIDITY_POOLLIST](state, payload) {
      state.poolList = payload;
    },
    [types.CHANGE_INPUT_DIALOG_PARAMS](state, payload) {
      state.inputDialogParams = Object.assign(
        {},
        state.inputDialogParams,
        payload
      );
    },
    [types.SET_CURR_LPTOKEN_INFO](state, payload) {
      state.lpTokenInfo = Object.assign({}, state.lpTokenInfo, payload);
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
    // 获取提取费用
    async getSwapMiningDrawGas({ commit, state }) {
      if (state.swapMiningDrawGas) return;
      const res = await farmsAPI.getSwapMiningDrawGas();
      if (res.code === 200) {
        commit(types.SWAP_MINING_DRAW_GAS, res.data.value);
      }
    },

    // 提取挖矿收益
    async drawMiningReward({ commit, state }) {
      commit(
        types.CHANGE_SECOND_DIALOG_PARAMS,
        FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS
      );
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "ongoing",
        dialogText: utilsFormat.computedLangCtx("提取中"),
      });
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        account: rootState.StoreWallet.accounts[0],
      };
      const txnHashData = await farmsAPI.getPersonCurrReward(params);
      if (txnHashData.code === 200) {
        let txnHash = txnHashData.data.transactionHash;
        commit(types.CHANGE_DIALOG_PARAMS, {
          phase1: "success",
        });
        utilsTool.pollingBlockHashInfo({ txnHash }).then((res) => {
          if (res === "Executed") {
            commit(types.CHANGE_DIALOG_PARAMS, {
              phase2: "success",
            });
            setTimeout(() => {
              commit(types.CHANGE_DIALOG_PARAMS, {
                dialogStatus: "success",
                dialogText: utilsFormat.computedLangCtx("操作成功"),
                successBtnText: utilsFormat.computedLangCtx("确认"),
                isShowClose: true,
                miningData: {
                  draw: utilsNumber
                    .bigNum(state.swapPersonData[0])
                    .minus(state.swapMiningDrawGas)
                    .toString(),
                  locked: utilsNumber
                    .bigNum(state.swapPersonData[0])
                    .times(0.5)
                    .toString(),
                },
              });
            }, 1500);
          }
        });
      } else {
        commit(types.CHANGE_DIALOG_PARAMS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx("提取收益失败"),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
        });
      }
    },
    canDrawProfit({ commit, state }, { type }) {
      console.log("type", type);
      let canDraw,
        params = {
          confirmText: utilsFormat.computedLangCtx("确认"),
          dialogVisible: true,
          cancelText: "",
          type,
        };
      if (type === "mining") {
        if (!state.swapMiningDrawGas) return;
        // swap 挖矿
        canDraw = utilsNumber
          .bigNum(state.swapPersonData[0])
          .times(0.5)
          .gt(state.swapMiningDrawGas);
        if (canDraw) {
          params = Object.assign({}, params, {
            operateWaring: true,
            dataParams: {
              draw: state.swapPersonData[0],
              locked: utilsNumber
                .bigNum(state.swapPersonData[0])
                .times(0.5)
                .toString(),
              gas: state.swapMiningDrawGas,
            },
          });
          commit(types.CHANGE_SECOND_DIALOG_PARAMS, params);
          return;
        }
      }
      if (type === "locked") {
        if (!state.swapMiningDrawGas) return;
        // swap 锁仓
        canDraw = utilsNumber
          .bigNum(state.swapPersonData[2])
          .gt(state.swapMiningDrawGas);
        if (canDraw) {
          params = Object.assign({}, params, {
            dataParams: {
              draw: state.swapPersonData[2],
              gas: state.swapMiningDrawGas,
            },
          });
          commit(types.CHANGE_SECOND_DIALOG_PARAMS, params);
          return;
        }
      }
      // 流动性kiko提取确认
      if (type === "liquiditykiko") {
        if (!state.liquidityDrawData) return;
        canDraw = utilsNumber
          .bigNum(state.liquidityDrawData)
          .gt(state.swapMiningDrawGas);
        if (canDraw) {
          params = Object.assign({}, params, {
            dataParams: {
              draw: state.liquidityDrawData,
              gas: state.swapMiningDrawGas,
            },
          });
          commit(types.CHANGE_SECOND_DIALOG_PARAMS, params);
          return;
        }
      }
      if (!canDraw) {
        commit(types.CHANGE_DIALOG_PARAMS, {
          dialogVisible: true,
          dialogStatus: "failed",
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          dialogText: utilsFormat.computedLangCtx("操作失败"),
          isShowClose: true,
        });
      }
    },
    // 提取锁仓收益
    async drawLockedReward({ commit, state, rootState }) {
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        account: rootState.StoreWallet.accounts[0],
      };
      commit(
        types.CHANGE_SECOND_DIALOG_PARAMS,
        FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS
      );
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "ongoing",
        dialogText: utilsFormat.computedLangCtx("提取中"),
      });
      const txnHashData = await farmsAPI.getPersonLockedReward(params);
      if (txnHashData.code === 200) {
        let txnHash = txnHashData.data.transactionHash;
        commit(types.CHANGE_DIALOG_PARAMS, {
          phase1: "success",
        });
        utilsTool.pollingBlockHashInfo({ txnHash }).then((res) => {
          if (res === "Executed") {
            commit(types.CHANGE_DIALOG_PARAMS, {
              phase2: "success",
            });
            setTimeout(() => {
              commit(types.CHANGE_DIALOG_PARAMS, {
                dialogStatus: "success",
                dialogText: utilsFormat.computedLangCtx("操作成功"),
                successBtnText: utilsFormat.computedLangCtx("确认"),
                isShowClose: true,
                miningData: {
                  draw: utilsNumber
                    .bigNum(state.swapPersonData[2])
                    .minus(state.swapMiningDrawGas)
                    .toString(),
                },
              });
            }, 1500);
          }
        });
      } else {
        commit(types.CHANGE_DIALOG_PARAMS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx("提取收益失败"),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
        });
      }
    },

    // 提取流动性kiko收益
    async drawLiquidityKIKOProfit({ commit, rootState, state }) {
      console.log("提取流动性kiko收益");
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        account: rootState.StoreWallet.accounts[0],
      };
      commit(
        types.CHANGE_SECOND_DIALOG_PARAMS,
        FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS
      );
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "ongoing",
        dialogText: utilsFormat.computedLangCtx("提取中"),
      });
      const txnHashData = await farmsAPI.drawLiquidityKIKOProfit(params);
      console.log("txnHashData", txnHashData);
      if (txnHashData.code === 200) {
        let txnHash = txnHashData.data.transactionHash;
        commit(types.CHANGE_DIALOG_PARAMS, {
          phase1: "success",
        });
        utilsTool.pollingBlockHashInfo({ txnHash }).then((res) => {
          if (res === "Executed") {
            commit(types.CHANGE_DIALOG_PARAMS, {
              phase2: "success",
            });
            setTimeout(() => {
              commit(types.CHANGE_DIALOG_PARAMS, {
                dialogStatus: "success",
                dialogText: utilsFormat.computedLangCtx("操作成功"),
                successBtnText: utilsFormat.computedLangCtx("确认"),
                isShowClose: true,
                miningData: {
                  draw: utilsNumber
                    .bigNum(state.liquidityDrawData)
                    .minus(state.swapMiningDrawGas)
                    .toString(),
                },
              });
            }, 1500);
          }
        });
      } else {
        commit(types.CHANGE_DIALOG_PARAMS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx("提取收益失败"),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
        });
      }
      // secondDialogParams: FARMS_CONSTANTS.SWAP_SECOND_DIALOG_PARAMS,
    },

    showLiquidityDialog({ commit, state }, type) {
      commit(types.CHANGE_INPUT_DIALOG_PARAMS, {
        dialogVisible: true,
        lpToken: state.lpTokenInfo.token,
        type, // draw add
      });
    },
    // 流动性提取和质押LpToken
    async liquidityContracts({ commit, rootState }, { type }) {
      console.log("liquidityContracts", liquidityContracts);
      commit(
        types.CHANGE_INPUT_DIALOG_PARAMS,
        FARMS_CONSTANTS.LIQUIDITY_INPUT_DIALOG_PARAMS
      );
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        account: rootState.StoreWallet.accounts[0],
      };
      if (type === "draw") {
        // 提取合约
      }
      if (type === "add") {
        // 提取合约
      }
      commit(types.CHANGE_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogStatus: "ongoing",
        dialogText:
          type === "draw"
            ? utilsFormat.computedLangCtx("提取中")
            : utilsFormat.computedLangCtx("质押中"),
      });
      // 失败
      // commit(types.CHANGE_DIALOG_PARAMS, {
      //   dialogStatus: "failed",
      //   dialogText: utilsFormat.computedLangCtx("操作失败"),
      //   failedBtnText: utilsFormat.computedLangCtx("确认"),
      //   isShowClose: true,
      // });
    },
    // 流动性的kiko收益
    async getLiquidityKikoReward({ commit }, payload) {
      const res = await farmsAPI.getLiquidityKikoReward(payload);
      if (res.code === 200) {
        commit(types.SET_LIQUIDITY_DRAW_DATA, res.data.currentReward);
      }
    },

    // 流动性 总质押
    async getLpTotalStakeAmount({ commit }) {
      const res = await farmsAPI.getLpTotalStakeAmount();
      if (res.code === 200) {
        commit(
          types.SET_LIQUIDITY_TOTAL_STAKE_AMOUNT,
          res.data.totalStakingAmount
        );
      }
    },

    // 流动 矿池列表
    async getLpPoolList({ commit }) {
      const res = await farmsAPI.getLpPoolList();
      if (res.code === 200) {
        commit(types.SET_LIQUIDITY_POOLLIST, res.data);
      }
    },

    // 获取用户流动性记录
    async getLPDataByUser({ commit, state }, payload) {
      const res = await commonAPI.getAllPoolListByUser(payload);
      if (res.result && res.result.resources) {
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
              const lpToken = `${tokens[0]}_${tokens[1]}`;
              if (lpToken === state.lpTokenInfo.token) {
                commit(types.SET_CURR_LPTOKEN_INFO, {
                  value: utilsNumber.formatNumberMeta(
                    utilsNumber
                      .bigNum(v.json.token.value)
                      .div(utilsNumber.bigNum(Math.pow(10, 9))),
                    {
                      precision: 9,
                      trailingZero: false,
                      round: "floor",
                    }
                  ).text,
                });
              }
            }
          }
        }
      }
    },
  },
};

export default StoreFarms;
