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

export const BID_DIALOG_PARAMS = {
  dialogVisible: false,
  isShowClose: true,
  title: "",
  label: "出售方式",
  BIDTYPES: ["一口价出售", "拍卖"],
  FIXEDPRICE: ["售价"],
  AUCTIONPRICE: ["起拍价", "拍卖时间"],
  TIME: [1, 3, 7],
  FIXEDTEXT:
    "一口价出售:选择这种方式时，买方只能一口价进行成交，商品在市场的展示不会有到期时间。直到卖家主动取消售卖或者成交。",
  AUCTIONTEXT:
    "拍卖: 卖方设定起拍价和到期时间，到期后若5分钟内没有新报价则与最高的报价进行成交。",
  FEETEXT:
    "费用：成交后将从卖家成交金额中收取2%，其中1%作为平台手续费，另外1%作为版权费支付给该NFT的创作者",
};

export default {
  WALLET_DIALOG_PARAMS,
  SECOND_DIALOG_PARAMS,
};
