import request from "@utils/request";

// 个人素材卡牌列表
function getIGOList() {
  return request({
    url: "/v1/meta/selfResource",
    method: "GET",
  });
}

export default {
  getIGOList,
};
