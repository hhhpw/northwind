/* eslint-disable */
import * as types from "../../types/NFT/mining";
import miningAPI from "@api/nft/mining.js";
import Wallet from "@wallet";
import utilsNumber from "@utils/number";
import utilsTool from "@utils/tool.js";
import utilsFormat from "@utils/format";
import {
  WALLET_DIALOG_PARAMS,
  SECOND_DIALOG_PARAMS,
} from "@constants/dialog.js";
const INIT_SELECTOR_DIALOG_PARAMS = {
  dialogVisible: false,
  data: [],
};

const MY_SECOND_DIALOG_PARAMS = Object.assign({}, SECOND_DIALOG_PARAMS, {
  isShowTitle: true,
  nftName: null,
  dataParams: {
    draw: 0,
    gas: 0,
  },
});

const handleWalletCloseEvent = (commit) => {
  commit(types.SET_WALLET_DIALOG_PARAMS, {
    dialogVisible: false,
  });
  setTimeout(
    () => commit(types.SET_WALLET_DIALOG_PARAMS, WALLET_DIALOG_PARAMS),
    200
  );
};

const handleSecondCloseEvent = (commit) => {
  commit(types.SET_SECOND_DIALOG_PARAMS, {
    dialogVisible: false,
  });
  setTimeout(() => {
    commit(types.SET_SECOND_DIALOG_PARAMS, MY_SECOND_DIALOG_PARAMS);
  }, 300);
};

const StoreNFTMining = {
  namespaced: true,
  moduleName: "StoreNFTMining",
  state: {
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
    walletDialogParams: WALLET_DIALOG_PARAMS,
    secondDialogParams: MY_SECOND_DIALOG_PARAMS,
    nftStakeList: null,
    gasData: null,
    miningData: null,
    nftList: null,
  },
  mutations: {
    [types.SET_MINING_DATA](state, payload) {
      state.miningData = payload;
    },
    [types.SET_SELECTOR_DIALOG_PARAMS](state, payload) {
      state.selectorDialogParams = Object.assign(
        {},
        state.selectorDialogParams,
        payload
      );
    },
    [types.SET_WALLET_DIALOG_PARAMS](state, payload) {
      state.walletDialogParams = Object.assign(
        {},
        state.walletDialogParams,
        payload
      );
    },
    [types.SET_SECOND_DIALOG_PARAMS](state, payload) {
      state.secondDialogParams = Object.assign(
        {},
        state.secondDialogParams,
        payload
      );
    },
    [types.SET_NFT_STAKE_LIST](state, list) {
      state.nftStakeList = list;
    },
    [types.SET_USER_NFT_LIST](state, list) {
      state.nftList = list;
    },
    [types.SET_GAS_DATA](state, data) {
      state.gasData = data;
    },
  },
  actions: {
    async drawMiningReward({ commit, state, rootState }, payload) {
      const account = rootState.StoreWallet.accounts[0];
      const sign = await Wallet.starMaskSign({ account: state.accounts[0] });
      if (sign !== "error") {
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          dialogVisible: true,
          dialogText: utilsFormat.computedLangCtx("提取中"),
        });
        const drawFailedEvent = () => {
          commit(types.SET_WALLET_DIALOG_PARAMS, {
            dialogStatus: "failed",
            dialogText: utilsFormat.computedLangCtx("提取收益失败"),
            failedBtnText: utilsFormat.computedLangCtx("确认"),
            isShowClose: true,
            handleFailed: () => handleWalletCloseEvent(commit),
            handleClose: () => handleWalletCloseEvent(commit),
          });
        };
        let params = {
          provider: rootState.StoreWallet.stcProvider,
          account: rootState.StoreWallet.accounts[0],
        };
        const res = await miningAPI.drawMiningReward(payload);
        if (res.code === 200) {
          const { transactionHash } = res.data;
          commit(types.SET_WALLET_DIALOG_PARAMS, {
            phase1: "succeed",
          });
          utilsTool
            .pollingBlockHashInfo({ txnHash: transactionHash })
            .then((res) => {
              if (res === "Executed") {
                commit(types.SET_WALLET_DIALOG_PARAMS, {
                  phase2: "succeed",
                });
                setTimeout(() => {
                  commit(types.SET_WALLET_DIALOG_PARAMS, {
                    dialogStatus: "succeed",
                    dialogText: utilsFormat.computedLangCtx("操作成功"),
                    successBtnText: utilsFormat.computedLangCtx("确认"),
                    isShowClose: true,
                    miningData: {
                      draw: utilsNumber
                        .bigNum(state.miningData.currentReward)
                        .minus(state.gasData)
                        .toString(),
                    },
                  });
                }, 1500);
              } else {
                drawFailedEvent();
              }
            });
        } else {
          drawFailedEvent();
        }
      } else {
        drawFailedEvent();
      }
    },
    // 放置NFT卡片
    async stakeNFT({ commit, rootState }, payload) {
      commit(types.SET_SELECTOR_DIALOG_PARAMS, {
        dialogVisible: false,
      });
      commit(types.SET_WALLET_DIALOG_PARAMS, {
        dialogVisible: true,
        dialogText: utilsFormat.computedLangCtx("nftmining.add-nft"),
        isShowClose: false,
      });
      const addNFTFailed = () => {
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx("nftmining.add-nft-failed"),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      };
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        ...payload,
      };
      const res = await miningAPI.drawMiningReward(params);
      if (res.code === 200) {
        const { transactionHash } = res.data;
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          phase1: "succeed",
        });
        utilsTool
          .pollingBlockHashInfo({ txnHash: transactionHash })
          .then((res) => {
            if (res === "Executed") {
              commit(types.SET_WALLET_DIALOG_PARAMS, {
                phase2: "succeed",
              });
              const handleSucceed = () => {
                window.location.reload();
              };
              setTimeout(() => {
                commit(types.SET_WALLET_DIALOG_PARAMS, {
                  dialogStatus: "succeed",
                  dialogText: utilsFormat.computedLangCtx(
                    "nftmining.add-nft-ok"
                  ),
                  successBtnText: utilsFormat.computedLangCtx("确认"),
                  isShowClose: true,
                  handleSucceed: handleSucceed,
                  handleClose: handleSucceed,
                });
              }, 1500);
            } else {
              addNFTFailed();
            }
          });
      } else {
        addNFTFailed();
      }
    },

    // 解押NFT
    async unStakeNFT({ commit, rootState }, payload) {
      commit(types.SET_WALLET_DIALOG_PARAMS, {
        dialogVisible: true,
        isShowClose: false,
        dialogText: utilsFormat.computedLangCtx("nftmining.remove-nft"),
      });
      const removeNFTFailed = () => {
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx(
            "nftmining.remove-nft-failed"
          ),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      };
      let params = {
        provider: rootState.StoreWallet.stcProvider,
        account: rootState.StoreWallet.accounts[0],
      };
      const res = await miningAPI.drawMiningReward(payload);
      if (res.code === 200) {
        const { transactionHash } = res.data;
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          phase1: "succeed",
        });
        utilsTool
          .pollingBlockHashInfo({ txnHash: transactionHash })
          .then((res) => {
            if (res === "Executed") {
              commit(types.SET_WALLET_DIALOG_PARAMS, {
                phase2: "succeed",
              });
              const handleSucceed = () => {
                window.location.reload();
              };
              setTimeout(() => {
                commit(types.SET_WALLET_DIALOG_PARAMS, {
                  dialogStatus: "succeed",
                  dialogText: utilsFormat.computedLangCtx(
                    "nftmining.remove-nft-ok"
                  ),
                  successBtnText: utilsFormat.computedLangCtx("确认"),
                  isShowClose: true,
                  handleSucceed: handleSucceed,
                  handleClose: handleSucceed,
                });
              }, 1500);
            } else {
              removeNFTFailed();
            }
          });
      } else {
        removeNFTFailed();
      }
    },

    async getStakeNFTList({ commit }, payload) {
      const res = await miningAPI.getStakeNFTList(payload);
      let data = new Array(5).fill("").map(() => {
        return {
          hasNFT: false,
        };
      });
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].imageLink) {
            res.data[i].hasNFT = true;
          }
          data[i] = Object.assign({}, { ...data[i] }, { ...res.data[i] });
        }
        commit(types.SET_NFT_STAKE_LIST, data);
      } else {
        commit(types.SET_NFT_STAKE_LIST, data);
      }
    },

    // 移除NFT
    removeNFT({ commit, dispatch }, payload) {
      commit(types.SET_SECOND_DIALOG_PARAMS, {
        imgParams: {
          url: payload.imageLink,
          width: "180px",
          height: "180px",
        },
        dialogVisible: true,
        confirmText: utilsFormat.computedLangCtx("确认"),
        cancelText: utilsFormat.computedLangCtx("取消"),
        isShowTitle: false,
        nftName: payload.nftName,
        handleClose: () => handleSecondCloseEvent(commit),
        handleCancel: () => handleSecondCloseEvent(commit),
        handleConfirm: () => {
          handleSecondCloseEvent(commit);
          dispatch("unStakeNFT");
        },
      });
    },

    // 是否可提取收益
    canDrawReward({ commit, state, dispatch }) {
      if (
        state.miningData.currentReward &&
        utilsNumber.bigNum(state.miningData.currentReward).gt(0) &&
        state.gasData &&
        utilsNumber.bigNum(state.miningData.currentReward).gt(state.gasData)
      ) {
        commit(types.SET_SECOND_DIALOG_PARAMS, {
          dialogVisible: true,
          confirmText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
          dataParams: {
            draw: state.miningData.currentReward,
            gas: state.gasData,
          },
          handleClose: () => handleSecondCloseEvent(commit),
          handleConfirm: () => {
            dispatch("drawMiningReward");
          },
        });
      } else {
        commit(types.SET_WALLET_DIALOG_PARAMS, {
          dialogVisible: true,
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx("操作失败"),
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          isShowClose: true,
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      }
    },

    async getMiningData({ commit }, userAddress) {
      const res = await miningAPI.getMiningData(userAddress);
      if (res.code === 200) {
        commit(types.SET_MINING_DATA, res.data);
        return "ok";
      }
    },

    async getUserNFTList({ commit }, userAddress) {
      const res = await miningAPI.getUserNFTList(userAddress);
      if (res.code === 200) {
        commit(types.SET_USER_NFT_LIST, res.data);
      }
    },

    async getNFTfee({ commit }) {
      const res = await miningAPI.getNFTfee();
      if (res.code === 200) {
        commit(types.SET_USER_NFT_LIST, res.data);
      }
    },
  },
};

export default StoreNFTMining;
