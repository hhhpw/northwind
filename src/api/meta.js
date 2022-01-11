import request from "@utils/request";

function getNFTDataByType(params) {
  return request({
    url: "/v1/nft/meta/selfResource",
    method: "GET",
    params,
  });
  // return {
  //   code: 200, //200成功，其他失败
  //   msg: "ok",
  //   timeStamp: 1234567890123,
  //   data: {
  //     //可拆解卡牌
  //     cardList: [
  //       {
  //         original: true, //是否是 原始卡牌
  //         customName: "原始1", //自定义名称
  //         sex: 1, //0女 1男
  //         image:
  //           "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/e613f7e6-409d-4a6b-83c9-58d377734d00/public",
  //         groupId: 22,
  //       },
  //       {
  //         original: true, //是否是 原始卡牌
  //         customName: "原始2", //自定义名称
  //         sex: 1, //0女 1男
  //         image:
  //           "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/f77439e0-b546-4c8f-9ad7-4a6fb76aab00/public",
  //         groupId: 23,
  //       },
  //       {
  //         original: true, //是否是 原始卡牌
  //         customName: "原始3", //自定义名称
  //         sex: 1, //0女 1男
  //         image:
  //           "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/95dcbb09-11ba-4278-c89b-089a838f4a00/public",
  //         groupId: 24,
  //       },
  //       {
  //         original: false, //是否是 原始卡牌
  //         customName: "组合1", //自定义名称
  //         sex: 1, //0女 1男
  //         image:
  //           "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/e8bc17ef-a1fd-4ce8-6c6d-d2860e58de00/public",
  //         groupId: 25,
  //       },
  //       {
  //         original: false, //是否是 原始卡牌
  //         customName: "组合2", //自定义名称
  //         sex: 1, //0女 1男
  //         image:
  //           "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/bb37d94d-703c-42a6-4df6-c0de9b2a1500/public",
  //         groupId: 26,
  //       },
  //     ],
  //     //元素
  //     elementMap: {
  //       clothes: [
  //         {
  //           type: "clothes",
  //           image:
  //             "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/bb37d94d-703c-42a6-4df6-c0de9b2a1500/public",
  //           score: 98.8,
  //           property: "blue",
  //           sum: 12,
  //           groupId: 22,
  //         },
  //         {
  //           type: "clothes",
  //           image:
  //             "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/e8bc17ef-a1fd-4ce8-6c6d-d2860e58de00/public",
  //           score: 10,
  //           property: "blue",
  //           sum: 12,
  //           groupId: 22,
  //         },
  //       ],
  //       eyes: [
  //         {
  //           type: "eyes",
  //           image:
  //             "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/bb37d94d-703c-42a6-4df6-c0de9b2a1500/public",
  //           score: 98.8,
  //           property: "blue",
  //           sum: 12,
  //           groupId: 22,
  //         },
  //       ],
  //     },
  //   },
  // };
}

// 个人素材卡牌列表
function getIGOList() {
  return request({
    url: "/v1/meta/selfResource",
    method: "GET",
  });
}

// 属性职业枚举
function getNFTMeatInfo() {
  return request({
    url: "/v1/nft/meta",
    method: "GET",
  });
  // return {
  //   code: 200,
  //   data: {
  //     elements: [
  //       {
  //         cnDesc: "Background",
  //         maskOrder: 10,
  //         id: 1,
  //         desc: "Background",
  //       },
  //       {
  //         cnDesc: "衣服",
  //         maskOrder: 80,
  //         id: 3,
  //         desc: "Clothes",
  //       },
  //       {
  //         cnDesc: "表情",
  //         maskOrder: 50,
  //         id: 4,
  //         desc: "Facial Expression",
  //       },
  //       {
  //         cnDesc: "头部",
  //         maskOrder: 90,
  //         id: 5,
  //         desc: "Head",
  //       },
  //       {
  //         cnDesc: "鞋子",
  //         maskOrder: 70,
  //         id: 11,
  //         desc: "Shoes",
  //       },
  //       {
  //         cnDesc: "身体",
  //         maskOrder: 40,
  //         id: 19,
  //         desc: "Body",
  //       },
  //       {
  //         cnDesc: "裤子",
  //         maskOrder: 60,
  //         id: 49,
  //         desc: "Pants",
  //       },
  //       {
  //         cnDesc: "左手",
  //         maskOrder: 30,
  //         id: 51,
  //         desc: "Left Hand",
  //       },
  //       {
  //         cnDesc: "右手",
  //         maskOrder: 100,
  //         id: 52,
  //         desc: "Right Hand",
  //       },
  //       {
  //         cnDesc: "尾巴",
  //         maskOrder: 20,
  //         id: 55,
  //         desc: "Tail",
  //       },
  //     ],
  //     occupations: [
  //       [
  //         {
  //           cnDesc: "冒险家",
  //           desc: "Adventurer",
  //         },
  //         {
  //           cnDesc: "极限玩家",
  //           desc: "Extreme Player",
  //         },
  //         {
  //           cnDesc: "运动员",
  //           desc: "Athletes",
  //         },
  //         {
  //           cnDesc: "无",
  //           desc: "None",
  //         },
  //       ],
  //     ],
  //   },
  //   msg: "OK",
  //   timeStamp: 1641542086273,
  // };
}

// 组合卡牌
function compositeCard(params) {
  // {
  //   userAddress: "",
  //   customName: "",
  //   elementList: [
  //     {
  //       id: "", 素材id
  //       eleName: "", 素材name
  //     }
  //   ]
  // }
  return request({
    url: "/v1/meta/selfResource",
    method: "POST",
    data: params,
  });
}

export default {
  getIGOList,
  getNFTMeatInfo,
  compositeCard,
  getNFTDataByType,
};
