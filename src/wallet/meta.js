/* eslint-disable */

import { getTxhash } from "./tool";
import { nftProtoArr } from "./nftproto";

/**** NFT META  ****/
// 分解NFT
const breakDownNFT = async ({ provider, nftId }) => {
  try {
    const funcId =
      process.env.VUE_APP_NFT_META_ADDRESS +
      process.env.VUE_APP_NFT_META_BREAK_DOWN_FUNCTION_ID;
    const tyArgs = [];
    const args = [nftId];
    console.log("funcId", funcId, "tyArgs", tyArgs, "args", args);
    return getTxhash(provider, funcId, tyArgs, args);
  } catch (e) {
    console.error("breakDownNFT", e);
    return "error";
  }
};

const composeNFT = async ({ provider, info }) => {
  try {
    const funcId =
      process.env.VUE_APP_NFT_META_ADDRESS +
      process.env.VUE_APP_NFT_MEAT_COMPOSE_CUSTOM_FUNCTION_ID;
    const { name, image, description, occupation, custom_name, sex } = info;
    const { selectedIds } = info;
    for (let i = 0; i < selectedIds.length; i++) {
      const index = selectedIds[i].index;
      nftProtoArr[index - 1] = selectedIds[i].chainId;
    }
    const tyArgs = [];
    const args = [
      name,
      image,
      description,
      occupation,
      custom_name,
      sex,
      ...nftProtoArr,
    ];
    console.log("funcId", funcId, "tyArgs", tyArgs, "args", args);
    return getTxhash(provider, funcId, [], args);
  } catch (e) {
    console.error("composeNFT", e);
    return "error";
  }
};
/**** NFT META  ****/

export default {
  breakDownNFT,
  composeNFT,
};
