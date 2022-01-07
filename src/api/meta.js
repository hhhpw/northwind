import request from "@utils/request";

// 个人素材卡牌列表
function getIGOList() {
  return request({
    url: "/v1/meta/selfResource",
    method: "GET",
  });
}

// 属性职业枚举
function getNFTMeatInfo() {
  // return request({
  //   url: " /v1/nft/meta",
  //   method: "GET",
  // });
  return {
    code: 200,
    data: {
      elements: [
        {
          cnDesc: "Background",
          maskOrder: 10,
          id: 1,
          desc: "Background",
        },
        {
          cnDesc: "衣服",
          maskOrder: 80,
          id: 3,
          desc: "Clothes",
        },
        {
          cnDesc: "表情",
          maskOrder: 50,
          id: 4,
          desc: "Facial Expression",
        },
        {
          cnDesc: "头部",
          maskOrder: 90,
          id: 5,
          desc: "Head",
        },
        {
          cnDesc: "鞋子",
          maskOrder: 70,
          id: 11,
          desc: "Shoes",
        },
        {
          cnDesc: "身体",
          maskOrder: 40,
          id: 19,
          desc: "Body",
        },
        {
          cnDesc: "裤子",
          maskOrder: 60,
          id: 49,
          desc: "Pants",
        },
        {
          cnDesc: "左手",
          maskOrder: 30,
          id: 51,
          desc: "Left Hand",
        },
        {
          cnDesc: "右手",
          maskOrder: 100,
          id: 52,
          desc: "Right Hand",
        },
        {
          cnDesc: "尾巴",
          maskOrder: 20,
          id: 55,
          desc: "Tail",
        },
      ],
      occupations: [
        [
          {
            cnDesc: "冒险家",
            desc: "Adventurer",
          },
          {
            cnDesc: "极限玩家",
            desc: "Extreme Player",
          },
          {
            cnDesc: "运动员",
            desc: "Athletes",
          },
          {
            cnDesc: "无",
            desc: "None",
          },
        ],
      ],
    },
    msg: "OK",
    timeStamp: 1641542086273,
  };
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
};
