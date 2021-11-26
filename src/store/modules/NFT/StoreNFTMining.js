/* eslint-disable */

import * as types from "../../types/NFT/mining";
import marketAPI from "@api/nft/market.js";
import Wallet from "@wallet";
import utilsNumber from "@utils/number";
import utilsTool from "@utils/tool.js";
import utilsFormat from "@utils/format";
import { WALLET_DIALOG_PARAMS } from "@constants/dialog.js";
import { cloneDeep } from "lodash";
const INIT_SELECTOR_DIALOG_PARAMS = {
  dialogVisible: false,
  data: [],
};

const StoreNFTMining = {
  namespaced: true,
  moduleName: "StoreNFTMining",
  state: {
    selectorDialogParams: cloneDeep(INIT_SELECTOR_DIALOG_PARAMS),
    walletDialogParams: cloneDeep(WALLET_DIALOG_PARAMS),
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
  },
  actions: {},
};

export default StoreNFTMining;
