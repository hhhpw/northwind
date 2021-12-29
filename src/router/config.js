import Layout from "../layout/Index.vue";
const routes = [
  {
    component: Layout,
    redirect: () => {
      return {
        name: "home",
      };
    },
    children: [
      {
        path: "/",
        component: () => import("@views/Home/Index.vue"),
        name: "home",
        meta: { title: "首页", url: "/" },
      },
      {
        path: "/swap",
        component: () => import("@views/Swap/Index.vue"),
        name: "swap",
        meta: { title: "兑换", url: "/swap", bg: "swap" },
      },
      {
        path: "/liquidity",
        component: () => import("@views/Liquidity/Index.vue"),
        name: "liquidity",
        meta: {
          title: "流动性",
          url: "/liquidity",
          bg: "liquidity",
        },
      },
      {
        path: "/nftblindbox",
        component: () => import("@views/NFT/BlindBox/Index.vue"),
        name: "nftblindbox",
        meta: {
          title: "盲盒",
          url: "/nftblindbox",
          bg: "nft",
        },
      },
      {
        path: "/nftblindbox/:id",
        component: () => import("@views/NFT/BlindBox/Detail.vue"),
        name: "nftblindboxdetail",
        meta: {
          title: "盲盒",
          url: "/nftblindbox/:id",
          bg: "nft",
        },
      },
      {
        path: "/nftbuyback",
        component: () => import("@views/NFT/BuyBack/Index.vue"),
        name: "nftbuyback",
        meta: { title: "平台回购", url: "/nftbuyback", bg: "nft" },
      },
      {
        path: "/nftcollection/:tabIndex",
        component: () => import("@views/NFT/Collection/Index.vue"),
        name: "nftcollection",
        meta: {
          title: "我的NFT",
          affix: true,
          url: "/nftcollection",
          bg: "nft",
        },
      },
      {
        path: "/nftmarket",
        component: () => import("@views/NFT/Market/Index.vue"),
        name: "nftmarket",
        meta: { title: "市场", url: "/nftmarket", bg: "nft" },
      },
      {
        path: "/nftcollectiondetail",
        component: () => import("@views/NFT/Collection/Detail.vue"),
        name: "nftcollectiondetail",
        meta: {
          title: "我的NFT详情",
          url: "/nftcollectiondetail",
          bg: "nft",
        },
      },
      {
        path: "/nftmarketdetail",
        component: () => import("@views/NFT/Market/Detail.vue"),
        name: "nftmarketdetail",
        meta: {
          title: "市场详情",
          url: "/nftmarketdetail",
          bg: "nft",
        },
      },
      {
        path: "/nftbuybackdetail",
        component: () => import("@views/NFT/BuyBack/Detail.vue"),
        name: "nftbuybackdetail",
        meta: {
          title: "平台回购详情",
          bg: "nft",
          url: "/nftbuybackdetail",
        },
      },
      {
        path: "/nftmining",
        component: () => import("@views/NFT/Mining/Index.vue"),
        name: "nftmining",
        meta: {
          title: "挖矿",
          url: "/nftmining",
        },
      },
      {
        path: "/info",
        component: () => import("@views/Info/Index.vue"),
        name: "info",
        meta: {
          title: "行情",
          bg: "nft",
          url: "/info",
        },
      },
      {
        path: "/swapfarms",
        component: () => import("@views/Farms/FarmSwap.vue"),
        name: "swapfarms",
        meta: {
          title: "交易挖矿",
          bg: "nft",
          url: "/swapfarms",
        },
      },
      {
        path: "/kgstarter",
        component: () => import("@views/KgStarter/Index.vue"),
        name: "kgstarter",
        meta: {
          title: "KGStarter",
          url: "/kgstarter",
        },
      },
      // {
      //   path: "/liquidityfarms",
      //   component: () => import("@views/Farms/FarmLiquidity.vue"),
      //   name: "liquidityfarms",
      //   meta: {
      //     title: "流动性挖矿",
      //     bg: "liquidity",
      //     url: "/liquidityfarms",
      //   },
      // },
      // {
      //   path: "/liquidityfarmsdetail",
      //   component: () => import("@views/Farms/FarmLiquidityDetail.vue"),
      //   name: "liquidityfarmsdetail",
      //   meta: {
      //     title: "流动性挖矿",
      //     bg: "swap",
      //     url: "/liquidityfarmsdetail",
      //   },
      // },
    ],
  },
];
export default routes;
