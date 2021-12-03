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

// 获取个人所有的nft
function getUserNFTList(userAddress) {
  // return request({
  //   url: "/v1/nft/unused/list",
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
        nftId: 1,
        groupId: 10001,
        name: "kikocat #10",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/c7a9ffae-aa9c-4e46-884f-a4ea2b055a00/public",
        score: 10000.0,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
      {
        id: 10000,
        nftId: 1,
        groupId: 10001,
        name: "kikocat #3",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/cca9ee86-f52f-404f-424e-462ea535be00/public",
        score: 123.322,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
      {
        id: 10000,
        nftId: 1,
        groupId: 10001,
        name: "kikocat #1",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/9d7e33c7-6627-4ad3-35a6-f3d4e120a800/public",
        score: 456.2,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
      {
        id: 10000,
        nftId: 1,
        groupId: 10001,
        name: "kikocat #10",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/18d6a7ba-b099-4a0f-0e59-ce099f563f00/public",
        score: 78123.22,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
      {
        id: 10000,
        nftId: 1,
        groupId: 10001,
        name: "kikocat #10",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/faa059c1-d0a2-4470-7885-e63e4b98c300/public",
        score: 235.2,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
      {
        id: 10000,
        nftId: 1,
        groupId: 10001,
        name: "kikocat #10",
        imageLink:
          "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/49c8f17d-b2e1-4614-2100-27788e33ca00/public",
        score: 872.12,
        rank: 1,
        seriesQuantity: 500,
        nftMeta: "",
        nftBody: "",
      },
    ],
  };
}

export default {
  getStakeNFTList,
  drawMiningReward,
  getMiningData,
  getUserNFTList,
};
