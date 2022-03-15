<template>
  <div>
    <fly-scroll
      :hasMore="state.listStatus.hasMore"
      :isLoading="state.listStatus.isLoading"
      :isShowMore="false"
      @loadMore="loadMore"
      :textLoading="false"
      gifType="white"
      :imgLoading="true"
      v-if="state.listData && state.listData.length > 0 && !state.firstLoading"
    >
      <template #content>
        <div class="nft-list-content">
          <div class="nft-blindbox-list">
            <div
              v-for="(d, i) in state.onSellOrWillSellData"
              :key="i"
              :set="(sellInfo = sellStatus(d.type, d.sellingTime))"
              @click="pushDetailPage(d.id)"
              class="nft-blindbox-list-item"
            >
              <div
                v-if="sellInfo.status !== 'sellout'"
                class="nft-blindbox-content-box"
              >
                <p
                  class="nft-blindbox-list-item-right-status"
                  :class="sellInfo.status"
                >
                  {{ $t(sellInfo.text) }}
                </p>
                <div class="nft-blindbox-content">
                  <div class="nft-blindbox-list-item-right">
                    <p class="nft-blindbox-list-item-right-title">
                      {{ d.seriesName }}-{{ d.name }}
                    </p>
                    <fly-space :size="32"></fly-space>
                    <div class="nft-blindbox-list-item-right-detail">
                      <div class="details-item-info">
                        <p>{{ $t("售价") }}：</p>
                        <span>
                          {{ d.sellingPrice }}
                          {{ utilsFormat.getTokenCurrency(d.payToken) }}
                        </span>
                      </div>
                      <div class="details-item-info">
                        <p>{{ $t("发行数量") }}：</p>
                        <span>
                          {{ d.seriesQuantity }}
                        </span>
                      </div>
                      <div class="details-item-info">
                        <p>{{ $t("剩余数量") }}：</p>
                        <span>
                          {{ d.amount }}
                        </span>
                      </div>
                    </div>
                    <fly-space :size="25"></fly-space>

                    <p
                      class="nft-blindbox-list-item-right-countdown"
                      v-if="sellInfo.status === 'willsell'"
                    >
                      <span>{{ $t("发售倒计时") }}:</span>
                      <span class="countdown">{{
                        (state.timers &&
                          state.timers[i] &&
                          state.timers[i].loaded &&
                          state.timers[i].countdown) ||
                        ""
                      }}</span>
                    </p>
                    <div
                      v-if="sellInfo.status === 'selling'"
                      class="buy-button actions-button"
                      @click="pushDetailPage(d.id)"
                    >
                      {{ $t("购买") }}
                    </div>
                  </div>
                  <img :src="d.seriesLogo" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="nft-past-list"
            :style="
              state.onSellOrWillSellData.length === 0 ? 'padding-top:55px' : ''
            "
          >
            <div
              class="nft-soldout-blindbox-item"
              v-for="(d, i) in state.soldOutData"
              :key="i"
              :set="(sellInfo = sellStatus(d.type, d.sellingTime))"
              @click="pushDetailPage(d.id)"
            >
              <div class="nft-soldout-content-box">
                <p
                  v-if="i === 0"
                  class="nft-soldout-title-status"
                  :class="sellInfo.status"
                >
                  {{ $t("往期回顾") }}
                </p>
                <img :src="d.seriesLogo" alt="" />
                <div class="nft-soldout-blindbox-content">
                  <p class="item-content-title">
                    {{ d.seriesName }}-{{ d.name }}
                  </p>
                  <fly-space :size="32"></fly-space>
                  <div class="item-content-info">
                    <div class="details-item-info">
                      <p>{{ $t("售价") }}：</p>
                      <span>
                        {{ d.sellingPrice }}
                        {{ utilsFormat.getTokenCurrency(d.payToken) }}
                      </span>
                    </div>
                    <div class="details-item-info">
                      <p>{{ $t("发行数量") }}：</p>
                      <span>
                        {{ d.seriesQuantity }}
                      </span>
                    </div>
                    <div class="details-item-info">
                      <p>{{ $t("剩余数量") }}：</p>
                      <span>
                        {{ d.amount }}
                      </span>
                    </div>
                  </div>
                  <p class="nft-soldout-status" :class="sellInfo.status">
                    {{ $t(sellInfo.text) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </fly-scroll>
    <fly-loading-fish
      style="margin-top: 30px"
      gifType="white"
      v-if="state.firstLoading"
    ></fly-loading-fish>
  </div>
</template>
<script setup>
import {
  computed,
  onMounted,
  reactive,
  onUnmounted,
  watch,
  onUpdated,
} from "vue";
import FlySpace from "@FlyUI/FlySpace.vue";
import utilsDate from "@utils/date.js";
import { isUndefined, cloneDeep } from "lodash";
import dayjs from "dayjs";
import utilsFormat from "@utils/format";
import FlyLoadingFish from "@FlyUI/FlyLoadingFish.vue";
import FlyScroll from "@FlyUI/FlyScroll.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

let state = reactive({
  listData: computed(() => store.state.StoreBlindBox.listData),
  timers: null,
  listStatus: computed(() => store.state.StoreBlindBox.listStatus),
  firstLoading: computed(() => store.state.StoreBlindBox.firstLoading),
  hasOnSellOrWillSell: true,
  onSellOrWillSellData: [],
  soldOutData: [],
});

const formateDate = (obj) => {
  const { day, hour, minute, second } = obj;
  if (
    isUndefined(day) &&
    isUndefined(hour) &&
    isUndefined(minute) &&
    isUndefined(second)
  ) {
    return;
  }
  return `${day === 0 ? "" : `${day}D`} ${hour}:${minute}:${second}`;
};

const playTimer = () => {
  state.timer = setInterval(() => {
    for (let key in state.timers) {
      state.timers[key].countdown = formateDate(
        utilsDate.countdown(state.timers[key].sellingTime)
      );
      state.timers[key].loaded = true;
    }
  }, 1000);
};

const loadMore = () => {
  store.dispatch("StoreBlindBox/getOfferingList", { type: "scroll" });
};

watch(
  () => state.listData,
  () => {
    setData();
    state.timers = cloneDeep(state.listData);
    state.timers.map((d) => {
      if (d.type === "willsell") {
        d.countdown = d.sellingTime;
      } else if (d.type === "sellout") {
        state.hasOnSellOrWillSell = false;
      } else {
        d.countdown = "";
      }
    });
    playTimer();
  }
);
onUpdated(() => {
  store.dispatch("StoreBlindBox/getOfferingList", { type: "init" });
});

onMounted(async () => {
  setData();
  if (!state.listData || (state.listData && state.listData.length === 0)) {
    const data = await store.dispatch("StoreBlindBox/getOfferingList", {
      type: "init",
    });
    if (data && data.length) {
      state.timers = cloneDeep(data);
      state.timers.map((d) => {
        if (d.type === "willsell") {
          d.countdown = d.sellingTime;
        } else if (d.type === "sellout") {
          state.hasOnSellOrWillSell = false;
        } else {
          d.countdown = "";
        }
      });
      playTimer();
    }
  }
});

const setData = () => {
  let newListData = state.listData.map((d) => {
    return {
      ...d,
      status: sellStatus(d.type, d.sellingTime).status,
    };
  });
  state.onSellOrWillSellData = newListData.filter(
    (d) => d.status !== "sellout"
  );
  state.soldOutData = newListData.filter((d) => d.status === "sellout");
};

onUnmounted(() => {
  // store.commit("StoreBlindBox/CLEAR_DATA");
});

const pushDetailPage = (groupId) => {
  router.push({
    path: `/nftblindbox/${groupId}`,
  });
};

const sellStatus = (type, sellingTime) =>
  /* eslint-disable-next-line */
  computed(() => {
    {
      if (type === "willsell") {
        if (dayjs().isAfter(sellingTime)) {
          return {
            status: "selling",
            text: "正在发售",
          };
        }
        return {
          status: "willsell",
          text: "即将发售",
        };
      }
      if (type === "selling") {
        return {
          status: "selling",
          text: "正在发售",
        };
      }
      if (type === "sellout") {
        return {
          status: "sellout",
          text: "已售罄",
        };
      }
    }
  }).value;
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.nft-blindbox-list {
  margin-top: 47px;
  position: relative;
  .nft-blindbox-list-item-right-status {
    font-size: 24px;
    color: $white;
  }
  .nft-blindbox-list-item:not(:first-child) {
    margin-top: 20px;
  }
  .nft-blindbox-list-item {
    width: 100%;
    cursor: pointer;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 72px;
    &:hover {
      opacity: 0.9;
    }
    .nft-blindbox-content-box {
      position: relative;
    }
    .nft-blindbox-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }
    img {
      width: 600px;
      height: 326px;
      border-radius: 16px;
    }
    .nft-blindbox-list-item-right {
      text-align: left;
      width: calc(100% - 672px);
      height: 243px;
      background: linear-gradient(180deg, #3e3e3e 0%, #3e3e3e 0%, #252525 100%);
      position: relative;
      top: 16px;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      padding-left: 73px;
      padding-top: 51px;
      .nft-blindbox-list-item-right-title {
        color: $white;
        font-size: 32px;
        font-weight: 600;
      }
      .nft-blindbox-list-item-right-detail {
        display: flex;
        color: $white;
        font-size: 14px;
        justify-content: space-between;

        .details-item-info {
          flex: 1;
          span {
            font-size: 20px;
          }
        }
      }
      .nft-blindbox-list-item-right-countdown {
        font-size: 24px;
        color: $white;
        span {
          font-size: 14px;
          display: block;
        }
        .countdown {
          font-size: 18px;
        }
      }
      .buy-button {
        width: 217px;
        color: $white;
        padding: 10px 0;
        background: linear-gradient(256deg, #fdd300 0%, #fba800 100%);
        box-shadow: 0px 12px 15px 0px rgba(253, 168, 0, 0.39);
        border-radius: 16px;
        text-align: center;
      }
    }
  }
}
.nft-past-list {
  margin-top: 47px;
  position: relative;
  overflow: hidden;
  padding-top: 55px;
  .nft-soldout-blindbox-item {
    width: 368px;
    height: 445px;
    float: left;
    margin-right: 47px;
    background: linear-gradient(180deg, #3e3e3e 0%, #3e3e3e 0%, #252525 100%);
    border-radius: 16px;
    margin-bottom: 40px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    img {
      width: 368px;
      height: 200px;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }
    .nft-soldout-title-status {
      position: absolute;
      color: $white;
      top: 0;
      font-size: 24px;
    }
    .item-content-title {
      color: $white;
      font-size: 20px;
      text-indent: 30px;
      margin-top: 18px;
    }
    .item-content-info {
      width: 309px;
      display: flex;
      color: $white;
      justify-content: space-between;
      margin: 0 30px;
      padding-bottom: 30px;
      .details-item-info {
        flex: 1;
        p {
          font-size: 14px;
        }
        span {
          font-size: 18px;
        }
      }
      border-bottom: 2px solid rgba(255, 255, 255, 0.14);
    }
    .nft-soldout-status {
      text-align: center;
      font-size: 20px;
      color: $white;
      margin-top: 20px;
    }
  }
}
</style>
