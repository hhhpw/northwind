/* eslint-disable */
import request from "@/utils/request";

function getTradingPoolList(payload) {
  // return request({
  //   url: "/v1/mining/trading/pool/list",
  //   method: "GET",
  //   params: {
  // userAddress: payload
  // }
  // });
  return {
    code: 200,
    msg: "OK",
    timeStamp: 1636424698607,
    data: [
      {
        id: 10000,
        pairName: "BTC_USDT",
        tokenA: "0x1::BTC::BTC",
        tokenB: "0x1::USDT::USDT",
        allocationMultiple: 25, // 分配系数
        currentTradingAmount: 0e-9, // 当前交易额
        totalTradingAmount: 0e-9, // 总交易额
        allocatedRewardAmount: 499.99998902, // 已分配奖励
        createTime: 0,
        updateTime: 0,
        weight: 0,
        apy: 120, // 年化收益
        tradingAmount: 4.48, // 交易额
        currentReward: 0.006092256, // 待领取收益
        totalReward: 0.00507688, // 总收益
        tokenIconA: "https://photo.16pic.com/00/68/78/16pic_6878865_b.png",
        tokenIconB: "https://photo.16pic.com/00/68/78/16pic_6878865_b.png",
      },
    ],
  };
}

export default {
  getTradingPoolList,
};
