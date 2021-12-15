<template>
  <div :class="$style['screen-data-container']">
    <p :class="$style['screen-data-container-title']">IGOs</p>

    <div :class="$style['data']">
      <div
        :class="$style['data-block']"
        :style="{ width: 240 * state.gamesData.length - 1 + 130 + 'px' }"
      >
        <div
          @click="setActiveItem(i)"
          v-for="(d, i) in state.gamesData"
          :key="i"
          :class="[
            $style['data-block-item'],
            state.activeIndex === i ? $style['data-block-item-active'] : '',
          ]"
        >
          <img :src="d.img" />
          <div
            :class="$style['data-block-item-bottom']"
            v-if="state.activeIndex === i"
          ></div>
        </div>
      </div>
    </div>
    <div :class="$style['data-info']">
      <p :class="$style['data-info-title']">ARM WREST WAR</p>
      <div :class="$style['data-info-detail']">
        <div :class="$style['data-info-detail-left']">
          <div :class="$style['data-info-detail-btn']">
            {{ $t("了解更多") }}
          </div>
          <div :class="$style['data-info-detail-contact']">
            <svg-icon
              v-for="(d, i) in ['igo-a', 'igo-b', 'igo-c', 'igo-d']"
              :key="i"
              :name="d"
            ></svg-icon>
          </div>
        </div>
        <div :class="$style['data-info-detail-right']">
          <p :class="$style['data-info-detail-right-title']">
            {{ $t("开始倒计时") }}:
          </p>
          <div :class="$style['data-info-detail-right-countdown']">
            <div
              v-for="(d, i) in new Array(4)"
              :key="i"
              :class="$style['data-info-detail-right-countdown-item']"
            >
              <p :class="$style['data-info-detail-right-countdown-item-time']">
                04
              </p>
              <p :class="$style['data-info-detail-right-countdown-item-flag']">
                days
              </p>
            </div>
          </div>
        </div>
      </div>
      <p :class="$style['data-info-desc']">
        同样的代码，如何判断谁的代码是优秀的代码？可读性，可扩展性，健壮性可能都可以用来判定，
        然而这些东西我觉得并不能直接体现出你代码的优秀，因为对用户而言，访问你的代码响应速度快那就是优秀的代码，
        相反，动辄响应几秒甚至更长时间的接口，恐怕就算你可读性再好，再健壮也称不上是好代码。
      </p>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
// Import Swiper Vue.js components

import { computed, onMounted, reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
let state = reactive({
  activeIndex: 0,
  gamesData: [
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/20d05722-23a1-42c3-2063-323145ff6100/public",
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/20d05722-23a1-42c3-2063-323145ff6100/public",
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/384feb5c-6acf-4806-1a3e-57da5f9e3100/public",
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/6339dc35-c74c-45ec-ba48-17db01d8d700/public",
    },
    {
      img: "https://imagedelivery.net/3mRLd_IbBrrQFSP57PNsVw/20d05722-23a1-42c3-2063-323145ff6100/public",
    },
  ],
});

const setActiveItem = (i) => {
  state.activeIndex = i;
};
</script>
<style lang="scss" module>
.screen-data-container {
  background-image: url("../../assets/igo/kg-content-main.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  .screen-data-container-title {
    color: #fec944;
    font-size: 20px;
    font-weight: bolder;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .data {
    margin: 0 auto;
    width: calc(100% - 60px);
    overflow-x: scroll;
    // overflow: hidden;
    .data-block {
      display: flex;
      .data-block-item {
        &:not(:first-child) {
          margin-left: 20px;
        }
        // &:last-child {
        //   clear: both;
        // }
        cursor: pointer;
        overflow: hidden;
        width: 220px;
        height: 155px;
        float: left;
        img {
          width: 100%;
          height: 135px;
          display: block;
          border-radius: 15px;
        }
        .data-block-item-bottom {
          margin-top: 10px;
          width: 100%;
          height: 5px;
          background: #fec944;
        }
      }
      .data-block-item-active {
        width: 320px !important;
      }
    }
  }
  .data-info {
    margin: 0 auto;
    width: calc(100% - 60px);
    padding: 0px 20px;
    margin-top: 5px;
    padding-bottom: 30px;
    .data-info-title {
      text-align: left;
      color: #fff;
      font-size: 24px;
    }
    .data-info-detail {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .data-info-detail-left {
        display: flex;
        align-items: center;
        .data-info-detail-btn {
          background-image: url("../../assets/igo/btn-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          height: 35px;
          width: 100px;
          text-align: center;
          line-height: 35px;
          font-size: 15px;
        }
        .data-info-detail-contact {
          margin-left: 15px;
          height: 35px;
          background: rgba(216, 216, 216, 0.2);
          width: 140px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0px 20px;
          svg {
            &:hover {
              opacity: 0.5 !important;
            }
            width: 28px;
            height: 28px;
            cursor: pointer;

            // margin-left: 10px;
          }
        }
      }

      .data-info-detail-right {
        text-align: right;
        color: #ffffff;
        .data-info-detail-right-title {
          font-size: 14px;
        }
        .data-info-detail-right-countdown {
          margin-top: 10px;
          display: flex;
          .data-info-detail-right-countdown-item {
            text-align: center;
            &:not(:first-child) {
              margin-left: 10px;
            }
            background: #d27c1a;
            width: 38px;
            padding: 0px 3px 3px;
            // padding-bottom: 3px;
            .data-info-detail-right-countdown-item-time {
              font-size: 16px;
              font-weight: bold;
              // margin-top: 2px;
            }
            .data-info-detail-right-countdown-item-flag {
              font-size: 10px;
              margin-top: -4px;
            }
          }
        }
      }
    }
    .data-info-desc {
      text-align: left;
      margin-top: 20px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
