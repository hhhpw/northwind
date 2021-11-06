// 正整数
const isInteger = (val) => new RegExp(/(^[1-9]\d*$)/g).test(val);

export default {
  isInteger,
};
