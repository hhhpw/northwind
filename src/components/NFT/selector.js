import utilsFormat from "@utils/format";
export const nftTypesList = [
  {
    label: utilsFormat.computedLangCtx("全部类型"),
    value: "",
  },
  {
    label: utilsFormat.computedLangCtx("盲盒"),
    value: "box",
  },
  {
    label: utilsFormat.computedLangCtx("原生NFT"),
    value: "nft",
  },
  {
    label: utilsFormat.computedLangCtx("重组NFT"),
    value: "composite_card ",
  },
  {
    label: utilsFormat.computedLangCtx("素材"),
    value: "composite_element",
  },
];

export const sortList = [
  {
    label: utilsFormat.computedLangCtx("价格"),
    value: "price",
  },
  {
    label: utilsFormat.computedLangCtx("上架时间"),
    value: "ctime",
  },
  {
    label: utilsFormat.computedLangCtx("稀有值"),
    value: "rarity",
  },
];
