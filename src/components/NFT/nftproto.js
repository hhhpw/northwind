import { computed } from "vue";
import utilsFormat from "@utils/format";
export default function renderProperties(box_detail) {
  const properties = computed(() => {
    return [
      {
        title: utilsFormat.computedLangCtx("nftproperty.背景"),
        value: box_detail.properties?.background || "--",
        score: box_detail.properties?.backgroundScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.皮肤"),
        value: box_detail.properties?.fur || "--",
        score: box_detail.properties?.furScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.衣服"),
        value: box_detail.properties?.clothes || "--",
        score: box_detail.properties?.clothesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.表情"),
        value: box_detail.properties?.facialExpression || "--",
        score: box_detail.properties?.facialExpressionScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.头部"),
        value: box_detail.properties?.head || "--",
        score: box_detail.properties?.headScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.配饰"),
        value: box_detail.properties?.accessories || "--",
        score: box_detail.properties?.accessoriesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.眼部"),
        value: box_detail.properties?.eyes || "--",
        score: box_detail.properties?.eyesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.帽子"),
        value: box_detail.properties?.hat || "--",
        score: box_detail.properties?.hatScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.服装"),
        value: box_detail.properties?.costume || "--",
        score: box_detail.properties?.costumeScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.妆容"),
        value: box_detail.properties?.makeup || "--",
        score: box_detail.properties?.makeupScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.鞋子"),
        value: box_detail.properties?.shoes || "--",
        score: box_detail.properties?.shoesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.嘴"),
        value: box_detail.properties?.mouth || "--",
        score: box_detail.properties?.mouthScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.耳环"),
        value: box_detail.properties?.earring || "--",
        score: box_detail.properties?.earringScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.项链"),
        value: box_detail.properties?.necklace || "--",
        score: box_detail.properties?.necklaceScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.颈部"),
        value: box_detail.properties?.neck || "--",
        score: box_detail.properties?.neckScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.头发"),
        value: box_detail.properties?.hair || "--",
        score: box_detail.properties?.hairScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.角"),
        value: box_detail.properties?.horn || "--",
        score: box_detail.properties?.hornScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.手"),
        value: box_detail.properties?.hands || "--",
        score: box_detail.properties?.handsScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.身体"),
        value: box_detail.properties?.body || "--",
        score: box_detail.properties?.bodyScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.纹身"),
        value: box_detail.properties?.tattoo || "--",
        score: box_detail.properties?.tattooScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.人物"),
        value: box_detail.properties?.people || "--",
        score: box_detail.properties?.peopleScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.性格"),
        value: box_detail.properties?.characteristic || "--",
        score: box_detail.properties?.characteristicScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.爱好"),
        value: box_detail.properties?.hobby || "--",
        score: box_detail.properties?.hobbyScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.星座"),
        value: box_detail.properties?.zodiac || "--",
        score: box_detail.properties?.zodiacScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.动作"),
        value: box_detail.properties?.action || "--",
        score: box_detail.properties?.actionScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.玩具"),
        value: box_detail.properties?.toys || "--",
        score: box_detail.properties?.toysScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.水果"),
        value: box_detail.properties?.fruits || "--",
        score: box_detail.properties?.fruitsScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.蔬菜"),
        value: box_detail.properties?.vegetables || "--",
        score: box_detail.properties?.vegetablesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.肉类"),
        value: box_detail.properties?.meta || "--",
        score: box_detail.properties?.metaScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.饮料"),
        value: box_detail.properties?.beverages || "--",
        score: box_detail.properties?.beveragesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.食物"),
        value: box_detail.properties?.food || "--",
        score: box_detail.properties?.foodScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.交通工具"),
        value: box_detail.properties?.vehicle || "--",
        score: box_detail.properties?.vehicleScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.天气"),
        value: box_detail.properties?.weather || "--",
        score: box_detail.properties?.weatherScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.月份"),
        value: box_detail.properties?.month || "--",
        score: box_detail.properties?.monthScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.运动"),
        value: box_detail.properties?.sports || "--",
        score: box_detail.properties?.sportsScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.音乐"),
        value: box_detail.properties?.music || "--",
        score: box_detail.properties?.musicScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.电影"),
        value: box_detail.properties?.movies || "--",
        score: box_detail.properties?.moviesScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.季节"),
        value: box_detail.properties?.season || "--",
        score: box_detail.properties?.seasonScore || "--",
      },
      {
        title: utilsFormat.computedLangCtx("nftproperty.搭配"),
        value: box_detail.properties?.outfit || "--",
        score: box_detail.properties?.outfitScore || "--",
      },
    ];
  });
  return {
    properties,
  };
}
