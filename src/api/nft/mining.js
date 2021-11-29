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

export default {
  getStakeNFTList,
};
