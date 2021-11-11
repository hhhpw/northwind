import utilsTools from "@utils/tool";
/* eslint-disable */
export default (app) => {
  app.directive("unsold-nft-url", {
    mounted(el, binding) {
      if (binding.value.isUnSoldNft && binding.value.url) {
        utilsTools.getImgTruePath(binding.value.url).then((res) => {
          el.src = res;
        });
      }
    },
  });
  app.directive("img-lazy-load", {
    mounted(el, binding) {},
  });
};
