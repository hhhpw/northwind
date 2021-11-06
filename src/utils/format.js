import utilsNumber from "./number.js";
import { computed } from "vue";
import i18n from "@i18n";

/**
 * 9900000 => 9 计算用
 * @param {*} balance
 * @param {*} precision
 * @returns
 */
const formatBalance = (balance, precision) => {
  return utilsNumber.bigNum(balance).div(Math.pow(10, precision)).toString();
};

const getTokenCurrency = (token) => {
  if (!token) return;
  return token.split("::")[2];
};

/**
 *
 * @param {*} price
 * @param {*} precision
 * @param {*} options
 * @returns 格式化分组等 展示用 后续使用Star-amount 不使用这个
 */
const formatPrice = (price, precision = 9, options) => {
  return utilsNumber.formatNumberMeta(
    utilsNumber.bigNum(price).div(Math.pow(10, precision)).toString(),
    Object.assign(
      {},
      {
        trailingZero: false,
        grouped: true,
      },
      options
    )
  ).text;
};

/**
 * 因为js切换时候刷新会不及时，用computed熟悉
 * @param {*} content
 * @returns
 */
const computedLangCtx = (content) => {
  return computed(() => {
    return i18n.global.t(content);
  });
};

export default {
  formatBalance,
  getTokenCurrency,
  formatPrice,
  computedLangCtx,
};
