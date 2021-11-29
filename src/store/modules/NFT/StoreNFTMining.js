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
import { cloneDeep } from "lodash";
const INIT_SELECTOR_DIALOG_PARAMS = {
  dialogVisible: false,
  data: [],
};

const StoreNFTMining = {
  namespaced: true,
  moduleName: "StoreNFTMining",
  state: {
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
    walletDialogParams: WALLET_DIALOG_PARAMS,
    secondDialogParams: SECOND_DIALOG_PARAMS,
    nftStakeList: null,
    myNFTMiningData: {
      power: 12321,
      profit: 321321,
      yearProfit: 55.5,
    },
  },
  mutations: {
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
      console.log("  state.secondDialogParams ", state.secondDialogParams);
    },
    [types.SET_NFT_STAKE_LIST](state, list) {
      state.nftStakeList = list;
    },
  },
  actions: {
    // handleSecondDialog({ commit }, payload) {},
    async getNFTMiningProfit({ commit }) {
      commit(types.SET_SECOND_DIALOG_PARAMS, SECOND_DIALOG_PARAMS);
    },

    async stakeNFT({ commit }) {
      commit(types.SET_WALLET_DIALOG_PARAMS, {
        dialogVisible: true,
      });
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
  },
};

export default StoreNFTMining;
