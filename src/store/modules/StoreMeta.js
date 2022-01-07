/* eslint-disable */
import * as types from "../types/meta.js";
import metaApi from "@api/meta.js";
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
    metaData: null,
    secondDialogParams: SECOND_DIALOG_PARAMS,
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
    dialogParams: WALLET_DIALOG_PARAMS,
    callBackDialogParams: INIT_CALL_BACK_DIALOG_PARAMS,
    selectedElementList: [],
    // 元素列表
    elementList: [
      {
        img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
        amount: 1,
        rarity: 13,
        zIndex: 1,
        id: 1,
      },
      {
        img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/a514fbd5-36c0-47a3-9f7e-819541c03300/public",
        amount: 12,
        rarity: 14,
        zIndex: 8,
        id: 1,
      },
      {
        img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/beadfda6-aa9f-4fa6-0fec-62ac7ac2c500/public",
        amount: 12,
        rarity: 15,
        isShow: false,
        zIndex: 7,
        id: 3,
      },
      {
        img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/02f9379e-ffbb-4f36-1d46-d1c46c1b4500/public",
        amount: 12,
        zIndex: 6,
        rarity: 100,
        id: 4,
      },
    ],
    type: "not-generated", // generated not-generated
  },
  getters: {
    canGenerated: (state) => {
      if (state.selectedElementList.length > 0) {
        return true;
      }
      return false;
    },
    totalScore: (state) => {
      if (state.selectedElementList.length > 0) {
        return state.selectedElementList.reduce((prev, curr) => {
          return prev + curr.rarity;
        }, 0);
      }
      return 0;
    },
  },
  mutations: {
    [types.SET_META_DATA](state, payload) {
      console.log("payload", payload);
      state.metaData = payload;
    },
    [types.SET_SELECTED_ELEMENT_LIST](state, payload) {
      state.selectedElementList = payload;
    },
    [types.CHANGE_MAIN_STATUS](state, payload) {
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
    },
  },
  actions: {
    setSelectedElementList({ commit, state }, payload) {
      // 应该是先看属性
      // 一个属性下只能选择一个
      console.log("payload", payload);
      console.log("state.selectedElementList", state.selectedElementList);
      const { type, data } = payload;
      if (type === "add") {
        commit(types.SET_SELECTED_ELEMENT_LIST, [
          ...state.selectedElementList,
          payload.data,
        ]);
      }
      if (type === "delete") {
        const list = state.selectedElementList.filter((d) => d.id !== data.id);
        console.log("===list====", list);
        commit(types.SET_SELECTED_ELEMENT_LIST, list);
      }
    },
    async getNFTMeatInfo({ commit }) {
      const res = await metaApi.getNFTMeatInfo();
      if (res.code === 200) {
        let { elements, occupations } = res.data;
        occupations = occupations.map((d, i) => {
          return {
            ...d,
            value: i + 1,
          };
        });
        commit(types.SET_META_DATA, {
          occupations,
          property: elements,
        });
      }
    },
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
