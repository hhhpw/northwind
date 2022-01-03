import * as types from "../types/meta.js";

const INIT_SELECTOR_DIALOG_PARAMS = {
  dialogVisible: false,
  data: [],
};

const StoreMeta = {
  namespaced: true,
  moduleName: "StoreMeta",
  state: {
    selectorDialogParams: INIT_SELECTOR_DIALOG_PARAMS,
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

export default StoreMeta;
