/* eslint-disable */
import request from "@/utils/request";

// swap 交易矿池list
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
        currentTradingAmount: 21321321, // 当前交易额
        totalTradingAmount: 2198, // 总交易额
        allocatedRewardAmount: 499.99998902, // 已分配奖励
        createTime: 0,
        updateTime: 0,
        weight: 0,
        apy: 120, // 年化收益
        tradingAmount: 4.48, // 交易额
        currentReward: 0.006092256, // 待领取收益
        totalReward: 0.00507688, // 总收益
        tokenIconA:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/3bfe4edc-b91a-429a-eb5c-0a529fbb2200/public",
        tokenIconB:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/771fed83-9d98-4be2-162d-b8639dfa6800/public",
      },
    ],
  };
}

// swapfarm 数据看班
function getTradingMarket(payload) {
  // return request({
  //   url: "/v1/mining/trading/market",
  //   method: "GET",
  //   params: {
  // userAddress: payload
  // }
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      totalTradingAmount: 123456.123, // 总交易额
      currentTradingAmount: 12345.123, // 当前交易额
      userCurrentTradingAmount: 123.123, // 我的交易额
      dailyTotalOutput: 100, // 每日产出
      dailyUserReward: 10, // 每日收益
    },
  };
}
// swap farm 个人受益
function getTradingReward(payload) {
  // return request({
  //   url: "/v1/mining/trading/reward",
  //   method: "GET",
  //   params: {
  //     userAddress: payload,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      currentReward: 0.0006, // 待领取收益
      lockedReward: 12345.123, // 锁仓收益
      freedReward: 123.123, // 已释放收益
    },
  };
}

// swap farm 提前当前收益
function getPersonCurrReward(payload) {
  // return request({
  //   url: "/v1/mining/trading/currentReward/harvest",
  //   method: "GET",
  //   params: {
  //     userAddress: payload,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      transactionHash:
        "0x13b80d11761b0a2aa1c4c977efc91f9760b8bd29c0f605bae090b08a37885e31", // 交易哈希
    },
  };
}
// swap farm 提取锁仓收益
function getPersonLockedReward(payload) {
  // return request({
  //   url: "/v1/mining/trading/freedReward/harvest",
  //   method: "GET",
  //   params: {
  //     userAddress: payload,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      transactionHash:
        "0x13b80d11761b0a2aa1c4c977efc91f9760b8bd29c0f605bae090b08a37885e31", // 交易哈希
    },
  };
}
// 提取费用
function getSwapMiningDrawGas() {
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      value: "0.0002",
    },
  };
}

// 获取流动性可提取kiko
function getLiquidityKikoReward(payload) {
  // return request({
  //   url: "/v1/mining/trading/reward",
  //   method: "GET",
  //   params: {
  //     userAddress: payload,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      value: 0.0006, // 待领取收益
    },
  };
}

export default {
  getTradingPoolList,
  getTradingMarket,
  getTradingReward,
  getPersonCurrReward,
  getSwapMiningDrawGas,
  getPersonLockedReward,
  getLiquidityKikoReward,
};
