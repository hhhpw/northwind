export const WALLET_DIALOG_PARAMS = {
  dialogVisible: false,
  isShowClose: true, // 弹窗关闭icon
  hasTitle: false,
  dialogStatus: "ongoing", //ongoing  failed  succeed
  dialogText: "", // 购买中等
  phase1: "loading", // loading succeed
  phase2: "loading", // loading succeed
  successBtnText: "",
  failedBtnText: "",
};

export const SECOND_DIALOG_PARAMS = {
  dialogVisible: false,
  isShowClose: true, //
  title: "", // 标题
  text: "", // 描述文案
  imgParams: {
    url: "",
    height: "",
    width: "",
  },
  confirmText: "A",
  cancelText: "",
};

export default {
  WALLET_DIALOG_PARAMS,
  SECOND_DIALOG_PARAMS,
};
