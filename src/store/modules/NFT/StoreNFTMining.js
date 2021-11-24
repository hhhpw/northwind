/* eslint-disable */

import * as types from "../../types/NFT/mining";
import marketAPI from "@api/nft/market.js";
import Wallet from "@wallet";
import utilsNumber from "@utils/number";
import utilsTool from "@utils/tool.js";
import utilsFormat from "@utils/format";
import { cloneDeep } from "lodash";

const INIT_SELECTOR_PARAMS = {
  dialogVisible: true,
  data: [],
};
const INIT_LIST_STATUS = {
  hasMore: true,
  isLoading: false,
};

const StoreNFTMining = {
  namespaced: true,
  moduleName: "StoreNFTMining",
  state: {
    selectorDialogParams: cloneDeep(INIT_SELECTOR_PARAMS),
  },
  mutations: {
    [types.SET_SELECTOR_DIALOG_PARAMS](state, payload) {
      state.selectorDialogParams = Object.assign(
        {},
        state.selectorDialogParams,
        payload
      );
    },
  },
  actions: {},
};

export default StoreNFTMining;
