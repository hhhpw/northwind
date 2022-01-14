/* eslint-disable */
import * as types from "../types/meta.js";
import metaApi from "@api/meta.js";
import utilsFormat from "@utils/format";
import utilsNumber from "@utils/number";
import utilsTool from "@utils/tool.js";
import Wallet from "@wallet/meta";
import collectionApi from "@api/nft/collection.js";
import CONSTANTS_TOKEN from "@constants/token.js";
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

const handleWalletCloseEvent = (commit) => {
  commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
    dialogVisible: false,
  });
  setTimeout(
    () => commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, WALLET_DIALOG_PARAMS),
    200
  );
};
const handleReload = () => {
  window.location.reload();
};

const StoreMeta = {
  namespaced: true,
  moduleName: "StoreMeta",
  state: {
    heroInfo: null,
    metaData: null,
    secondDialogParams: SECOND_DIALOG_PARAMS,
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
    dialogParams: WALLET_DIALOG_PARAMS,
    callBackDialogParams: INIT_CALL_BACK_DIALOG_PARAMS,
    selectedElementList: [],
    type: "not-generated", // generated not-generated
    composeNFT: [],
    allSplitNFT: [],
    allElements: null,
  },
  getters: {
    elementList: (state) => {
      if (state.currProto && state.allElements) {
        return state.allElements[state.currProto.desc.toLowerCase()];
      }
    },
    canGenerated: (state) => {
      if (state.selectedElementList.length > 0) {
        return true;
      }
      return false;
    },
    totalScore: (state) => {
      if (state.selectedElementList.length > 0) {
        return state.selectedElementList.reduce((prev, curr) => {
          return prev + curr.score;
        }, 0);
      }
      return 0;
    },
  },
  mutations: {
    [types.SET_CURR_NFT_PROPERTY](state, payload) {
      state.currProto = payload;
    },
    [types.SET_USER_DATA](state, payload) {
      state[payload.key] = payload.data;
    },
    [types.SET_META_DATA](state, payload) {
      state.metaData = payload;
    },
    [types.SET_SELECTED_ELEMENT_LIST](state, payload) {
      state.selectedElementList = payload;
    },
    [types.CHANGE_MAIN_STATUS](state, payload) {
      const { type, data } = payload;
      state.type = type;
      if (payload === "generated") {
        state.heroInfo = data;
      } else {
        state.heroInfo = null;
      }
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
    },
  },
  actions: {
    setSelectedElementList({ commit, state }, payload) {
      // 一个属性下只能选择一个;
      const { type, data } = payload;
      if (type === "add") {
        let list = state.selectedElementList;
        if (state.selectedElementList && state.selectedElementList.length > 0) {
          list = state.selectedElementList.filter((d) => d.type !== data.type);
        }
        commit(types.SET_SELECTED_ELEMENT_LIST, [
          ...list,
          Object.assign({}, payload.data, {
            maskOrder: state.currProto.maskOrder,
          }),
        ]);
      }
      if (type === "delete") {
        const list = state.selectedElementList.filter(
          (d) => d.type !== data.type
        );
        commit(types.SET_SELECTED_ELEMENT_LIST, list);
      }
    },
    async getNFTMeatInfo({ commit }) {
      const res = await metaApi.getNFTMeatInfo();
      if (res.code === 200) {
        let { elements, occupations, compositeFee } = res.data;
        occupations = occupations[0].map((d, i) => {
          return {
            ...d,
            value: d.desc,
          };
        });
        commit(types.SET_META_DATA, {
          occupations,
          property: elements,
          compositeFee,
        });
        commit(types.SET_CURR_NFT_PROPERTY, elements[0]);
      }
    },
    changeOperateStatus({ commit }, payload) {
      commit(types.CHANGE_OPERATE_STATUS, payload);
    },

    // 生成
    async generateNFTRole({ rootState, commit, state }, payload) {
      commit(types.SET_SECOND_DIALOG_PARAMS_STATUS, SECOND_DIALOG_PARAMS);
      commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
        dialogVisible: true,
        isShowClose: false,
        dialogText: utilsFormat.computedLangCtx(
          "metaverse.generating character cards"
        ),
      });
      // 钱包账户不够
      const balances = rootState.StoreWallet.balances;
      if (
        !balances?.[CONSTANTS_TOKEN.STC] ||
        utilsNumber
          .bigNum(utilsFormat.formatBalance(balances[CONSTANTS_TOKEN.STC], 9))
          .lte(state.metaData.compositeFee)
      ) {
        commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
          dialogText: utilsFormat.computedLangCtx(
            "metaverse.generated character cards failed"
          ),
          dialogStatus: "failed",
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      }
      try {
        const composeData = await metaApi.compositeCard(payload);
        if (composeData.code === 200) {
          const { nftInfoId, image, description, name } = composeData.data;
          const { elementList, occupation, sex, customName } = payload;
          const { property } = state.metaData;
          // 在所有的元素里过滤到未选择的
          // 并获取到位置key
          // 在从个人elementmap里获取chaind，value
          // {index:key, chainId: value}
          let filterElements = [];
          for (let i = 0; i < elementList.length; i++) {
            // 挑选所选择素材的id
            const t = property.filter(
              (d) => d.desc === elementList[i].eleName
            )[0];
            filterElements.push(t);
          }
          const allElements = state.allElements;
          const values = Object.values(allElements);
          for (let i = 0; i < filterElements.length; i++) {
            for (let k = 0; k < values.length; k++) {
              if (filterElements[i].desc === values[k][0].eleName) {
                const chainId = Object.keys(values[k][0].chainNftIds);
                filterElements[i].chainId = chainId[0];
              }
            }
          }
          const selectedIds = filterElements.map((d) => {
            return {
              chainId: d.chainId,
              index: d.id,
            };
          });
          const provider = rootState.StoreWallet.stcProvider;
          const params = {
            provider,
            info: {
              name,
              image,
              description,
              occupation,
              custom_name: customName,
              sex,
              selectedIds,
            },
          };
          const txnHash = await Wallet.composeNFT(params);
          if (txnHash === "error") {
            throw new Error();
          }
          commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
            phase1: "succeed",
          });
          utilsTool.getChainTransactionInfo({ txnHash }).then((res) => {
            if (res?.status === "Executed") {
              commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
                phase2: "succeed",
              });
              const handleSucceed = () => {
                commit(
                  types.SET_WALLET_DIALOG_PARAMS_STATUS,
                  WALLET_DIALOG_PARAMS
                );
                commit(types.CHANGE_MAIN_STATUS, {
                  data: Object.assign({}, payload, {
                    imageUrl: image,
                  }),
                  type: "generated",
                });
              };
              setTimeout(() => {
                commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
                  dialogStatus: "succeed",
                  successBtnText: utilsFormat.computedLangCtx("确认"),
                  dialogText: utilsFormat.computedLangCtx(
                    "metaverse.generated character cards succeed"
                  ),
                  handleSucceed: handleSucceed,
                  handleClose: handleSucceed,
                  isUseCustomContent: false,
                });
              }, 1500);
            } else {
              throw new Error();
            }
          });
        }
      } catch {
        commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx(
            "metaverse.generated character cards failed"
          ),
          isUseCustomContent: false,
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      }
    },

    canCreateNFT({ commit, dispatch }, payload) {
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
          dispatch("generateNFTRole", payload);
        },
      });
    },

    // 获取NFT
    async getNFTDataByType({ commit }, payload) {
      const res = await metaApi.getNFTDataByType(payload);
      if (res.code === 200) {
        const { cardList, elementMap } = res.data;
        if (payload.nftType === "split") {
          let composeNFT = [];
          let totalNFT = [];
          if (cardList && cardList.length > 0) {
            composeNFT = cardList.filter((d) => d.original === false);
            totalNFT = cardList.map((d) => {
              return {
                ...d,
                isShow: false,
              };
            });
          }
          commit(types.SET_USER_DATA, {
            key: "composeNFT",
            data: composeNFT,
          });
          commit(types.SET_USER_DATA, {
            key: "allSplitNFT",
            data: totalNFT,
          });
        }
        if (payload.nftType === "element") {
          commit(types.SET_USER_DATA, {
            key: "allElements",
            data: elementMap,
          });
        }
      }
    },

    // 分解
    async breakDownNFTRole({ commit, rootState }, payload) {
      commit(types.SET_SELECTOR_DIALOG_PARAMS, { dialogVisible: false });
      commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
        dialogVisible: true,
        isShowClose: false,
        dialogText: utilsFormat.computedLangCtx(
          "metaverse.breaking down character cards"
        ),
      });
      try {
        const nftDetail = await collectionApi.getNftDetail(
          payload.nftMeta,
          payload.nftBody,
          payload.chainId,
          payload.payToken
        );
        if (nftDetail.code === 200) {
          console.log("====nftDetail=====", nftDetail.data);
          let { compositeElements } = nftDetail.data;
          compositeElements = compositeElements.map((d) => {
            return {
              key: utilsFormat.computedLangCtx(`nftproperty.${d.type}`),
              value: d.property,
            };
          });
          const params = {
            provider: rootState.StoreWallet.stcProvider,
            nftId: payload.chainId,
          };

          const txnHash = await Wallet.breakDownNFT(params);
          if (txnHash === "error") {
            throw new Error();
          }
          commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
            phase1: "succeed",
          });
          utilsTool.getChainTransactionInfo({ txnHash }).then((res) => {
            if (res?.status === "Executed") {
              commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
                phase2: "succeed",
              });

              setTimeout(() => {
                commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
                  dialogStatus: "succeed",
                  successBtnText: utilsFormat.computedLangCtx("确认"),
                  isShowClose: true,
                  dialogText: utilsFormat.computedLangCtx(
                    "metaverse.decomposed character cards succeed"
                  ),
                  handleSucceed: handleReload,
                  handleClose: handleReload,
                  isUseCustomContent: true,
                  isUseStatusImg: false,
                  customContent: compositeElements,
                });
              }, 1500);
            } else {
              throw new Error();
            }
          });
        }
      } catch {
        commit(types.SET_WALLET_DIALOG_PARAMS_STATUS, {
          dialogVisible: true,
          dialogStatus: "failed",
          dialogText: utilsFormat.computedLangCtx(
            "metaverse.decomposed character cards failed"
          ),
          isUseCustomContent: false,
          failedBtnText: utilsFormat.computedLangCtx("确认"),
          handleFailed: () => handleWalletCloseEvent(commit),
          handleClose: () => handleWalletCloseEvent(commit),
        });
      }
    },
  },
};

export default StoreMeta;
