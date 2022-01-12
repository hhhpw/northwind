export const WALLET_DIALOG_PARAMS = {
  dialogVisible: false,
  isShowClose: true, // 弹窗关闭icon
  hasTitle: false,
  dialogStatus: "ongoing", //ongoing  failed  succeed
  dialogText: "", // 购买中... 等类似文案
  phase1: "loading", // loading succeed
  phase2: "loading", // loading succeed
  successBtnText: "",
  failedBtnText: "",
  handleFailed: null, // funciton
  handleSucceed: null,
  handleClose: null,
  isUseStatusImg: true, // 是否使用自带的三种状态img
  isUseCustomContent: false, // 是否使用自定义内容
  customContent: null, // 自定义数据
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
  confirmText: "",
  cancelText: "",
  handleCancel: null, // funciton
  handleConfirm: null,
  handleClose: null,
};

export default {
  WALLET_DIALOG_PARAMS,
  SECOND_DIALOG_PARAMS,
};
