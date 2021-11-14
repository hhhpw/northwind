import CONSTANTS from "@constants/farms.js";
import store from "@store/index.js";

const swap_second_dialog_params_init = () =>
  store.commit(
    "StoreFarms/CHANGE_SECOND_DIALOG_PARAMS",
    CONSTANTS.SWAP_SECOND_DIALOG_PARAMS
  );

// const swap_dialog_params_init = () =>
//   store.commit("StoreFarms/CHANGE_DIALOG_PARAMS", CONSTANTS.SWAP_DIALOG_PARAMS);

export const dialogEventMaps = {
  swapSecondDialog: {
    handleClose: (type) => {
      console.log("handleClose", type);
      swap_second_dialog_params_init();
    },
    handleSuccess: (type) => {
      if (type === "mining") {
        console.log("A");
        store.dispatch("StoreFarms/drawMiningReward");
      }
      if (type === "locked") {
        store.dispatch("StoreFarms/drawLockedReward");
      }
    },
    handleFailed: () => {
      // window.location.reload();
    },
  },
  swapDialog: {
    handleClose: (type) => {
      console.log("handleClose", type);
      if (type === "failed") {
        dialogEventMaps.swapDialog.handleFailed();
      } else if (type === "success") {
        dialogEventMaps.swapDialog.handleSuccess();
      }
    },
    handleSuccess: () => {
      console.log("=====");
      window.location.reload();
    },
    handleFailed: () => {
      // swap_second_dialog_params_init();
      // swap_dialog_params_init();
      window.location.reload();
    },
  },
};
