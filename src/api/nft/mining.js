/* eslint-disable */

import request from "@utils/request";

// NFT质押列表

function getStakeNFTList(userAddress) {
  // return request({
  //   url: "/v1/nft/box/offering/list",
  //   method: "GET",
  //   params: {
  //     userAddress,
  //   },
  // });
  return {
    code: 200,
    msg: "OK",
    timeStamp: 1636424698607,
    data: [
      {
        id: 10000,
        name: "kikocat #10",
        score: 10000.0, // 算力
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/724fcf0b-42a2-47b3-31f7-1c2e6a150b00/public", // 图片
        order: 1, // 位置
      },
    ],
  };
}

// 获取挖矿收益
function drawMiningReward(userAddress) {
  // return request({
  //   url: "/v1/mining/nft/reward/harvest",
  //   method: "POST",
  //   data: {
  //     userAddress,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      transactionHash: "0xABCD1234", // 交易哈希
    },
  };
}

// 数据看板
function getMiningData(userAddress) {
  // return request({
  //   url: "/v1/mining/nft/market",
  //   method: "GET",
  //   params: {
  //     userAddress,
  //   },
  // });
  return {
    code: 200,
    msg: "ok",
    timeStamp: 1234567890123,
    data: {
      dailyTotalOutput: 100, // 每日产出
      totalScore: 10000.0, // 总算力
      userScore: 100.0, // 用户算力
      currentReward: 123.123, // 待领取收益
      avgApr: 12312, // 平均年化收益率
      userApr: 512, // 用户年化收益率
    },
  };
}

export default {
  getStakeNFTList,
  drawMiningReward,
  getMiningData,
};
