<!-- seven screen page -->
<template>
  <div class="seven-wrap">
    <div class="bg-wrap">
      <img class="bg" src="../../assets/home/new-home/seven-img.png" alt="" />
      <div class="data-wrap">
        <ul>
          <li v-for="(item, index) in state.dataSource" :key="index">
            <fly-amount
              :value="item.value"
              :displayPreFix="index !== 2 ? '$' : ''"
              :formatOptions="{
                precision: 2,
                compact: true,
                grouped: true,
                trailingZero: false,
              }"
            ></fly-amount>
            <p>{{ $t(item.desc) }}</p>
          </li>
        </ul>
      </div>
    </div>
    <img class="coin" src="../../assets/home/new-home/seven-coin.png" alt="" />
    <div class="shadow"></div>
    <div class="bottom-wrap">
      <div class="bottom-content">
        <div class="bottom-left">
          <img src="../../assets/home/new-home/cat-bottom.png" alt="" />
          <div>
            <img src="../../assets/home/new-home/kikoverse.svg" alt="" />
            <span>Fishing Crypto with kiko</span>
          </div>
        </div>
        <div class="bottom-right">
          <ul>
            <li
              v-for="(item, index) in state.mediumList"
              :key="index"
              @click="pushPage(item)"
            >
              <img :src="item.img" alt="" />
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import utilsTool from "@utils/tool.js";
import FlyAmount from "@FlyUI/FlyAmount";
import commonApi from "@api/common";
const store = useStore();

let state = reactive({
  mediumList: [
    {
      img: require("../../assets/home/new-home/twitter.svg"),
      text: "Twitter",
      url: "https://twitter.com/Kiko_verse",
    },
    {
      img: require("../../assets/home/new-home/telegram.svg"),
      text: "Telegram",
      url: "https://t.me/kikoswap",
      enUrl: "https://t.me/kikoverseEnglish",
    },
    {
      img: require("../../assets/home/new-home/medium.svg"),
      text: "Medium",
      url: "https://medium.com/@KikoResearch",
    },
    {
      img: require("../../assets/home/new-home/discord.svg"),
      text: "discord",
      url: "https://discord.com/invite/45pPRYMMjk",
    },
  ],
  currLang: computed(() => store.state.StoreApp.currLang),
  dataSource: [],
});

onMounted(async () => {
  const res = await commonApi.getVolumeData();
  console.log("res:====", res);
  if (res.code === 200) {
    let data = Object.entries(res.data);
    data = data.map((d, i) => {
      return {
        value: d[1],
        desc:
          i === 0 ? "总锁仓量" : i === 1 ? "总交易量" : i === 2 ? "用户数" : "",
      };
    });
    state.dataSource = data;
    console.log("dataSource:====", state.dataSource);
  }
});

const pushPage = (item) => {
  state.currLang === "zh"
    ? utilsTool.openNewWindow(item.url)
    : (item?.enUrl && utilsTool.openNewWindow(item?.enUrl)) ||
      utilsTool.openNewWindow(item.url);
};
</script>

<style lang="scss" scoped>
.seven-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .bg-wrap {
    width: 100%;
    height: 72%;
    position: relative;
    .bg {
      height: 90%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .data-wrap {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translateX(-50%);
      z-index: 11;
      display: flex;
      justify-content: center;
      ul {
        display: flex;
        width: 60%;
        justify-content: space-between;
        li {
          list-style-type: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          & > div {
            font-size: 32px;
            font-family: Denmark;
            color: #ffffff;
            line-height: 37px;
            span:last-child {
              margin-left: 4px;
            }
          }
          span {
            font-size: 32px;
            font-family: DenmarkRegular;
            color: #ffffff;
            line-height: 37px;
          }
          p {
            margin-top: 12px;
            font-size: 14px;
            font-family: DenmarkRegular;
            color: #ffffff;
            line-height: 16px;
          }
        }
      }
    }
  }
  .coin {
    width: 30%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom-wrap {
    width: 100%;
    height: 28%;
    background: #232323;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .bottom-content {
      width: 1050px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bottom-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 120px;
          height: 95px;
        }
        div {
          display: flex;
          flex-direction: column;
          margin-left: 18px;
          img {
            height: 35px;
          }
          span {
            margin-top: 2px;
            font-size: 21px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 29px;
          }
        }
      }
      .bottom-right {
        ul {
          display: flex;
          align-items: center;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style-type: none;
            margin-left: 36px;
            cursor: pointer;
            img {
              width: 32px;
              height: 32px;
            }
            span {
              margin-top: 4px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
            }
          }
        }
      }
    }
  }

  .shadow {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 30%;
    height: 40%;
    background: linear-gradient(166deg, #de7d00 0%, #feca4a 100%);
    opacity: 0.43;
    filter: blur(138px);
  }
}
</style>
