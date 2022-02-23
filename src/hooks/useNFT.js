/* eslint-disable */
import { computed, reactive } from "vue";

const NFT_TYPES = ["composite_card", "composite_element", "nft", "box"];

const useNFT = (store, data) => {
  console.log("data", data);
  let state = reactive({
    accounts: computed(() => store.state.StoreWallet.accounts),
  });

  // 是否是所有者
  const isOwner = (address) =>
    computed(() => {
      if (state.accounts && state.accounts[0]) {
        return address === state.accounts[0];
      }
    });

  // 是否再售
  // const isOnSell = computed(() => {
  //   return data.onSell;
  // }).value;

  // 获取NFTtype
  const getNFTType = computed(() => {
    return data.type;
  }).value;

  // 是否符合nft类型
  const isSameNFTType = (typeArr) => {
    if (typeArr.indexOf(data.type) > -1) {
      return true;
    }
    return false;
  };

  // 区分盲盒或者NFT
  const isNFT = (type) => {
    const t = NFT_TYPES.map((d) => d.toUpperCase());
    if (t.indexOf(type.toUpperCase()) > -1) {
      return true;
    }
    return false;
  };

  // 出价方式  一口价或者拍卖
  const getOfferPriceStyle = (type) => {
    return type;
  };

  return {
    isOwner,
    // isOnSell,
    getNFTType,
    isSameNFTType,
    isNFT,
    getOfferPriceStyle,
  };
};

export { useNFT };
