/* eslint-disable */

import request from "@utils/request";

// NFT质押列表
function getStakeNFTList(address) {
  return request({
    url: "/v1/mining/nft/staking/list",
    method: "GET",
    params: {
      address,
    },
  });
  // return {
  //   code: 200,
  //   msg: "OK",
  //   timeStamp: 1636424698607,
  //   data: [
  //     {
  //       id: 10000,
  //       name: "kikocat #10",
  //       score: 123.0, // 算力
  //       imageLink:
  //         "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/724fcf0b-42a2-47b3-31f7-1c2e6a150b00/public", // 图片
  //       order: 1, // 位置
  //     },
  //   ],
  // };
}

// 获取挖矿收益
function drawMiningReward(address) {
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
function getMiningData(address) {
  return request({
    url: "/v1/mining/nft/market",
    method: "GET",
    params: {
      address,
    },
  });
}

// 获取个人所有可质押的nft
function getUserNFTList(address) {
  return request({
    url: "/v1/nft/unused/list",
    method: "GET",
    params: {
      address,
    },
  });
}

// 收益提取费用

function getNFTfee() {
  return request({
    url: "/v1/mining/nft/fee",
    method: "GET",
  });
}

export default {
  getStakeNFTList,
  drawMiningReward,
  getMiningData,
  getUserNFTList,
  getNFTfee,
};
