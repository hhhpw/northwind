<!-- seven screen page -->
<template>
  <div class="seven-wrap">
    <img class="bg" src="../../assets/home/new-home/seven-img.png" alt="" />
    <img class="coin" src="../../assets/home/new-home/seven-coin.png" alt="" />
    <div class="bottom-wrap">
      <div class="bottom-content">
        <div class="bottom-left">
          <img src="../../assets/home/new-home/cat-bottom.png" alt="" />
          <div>
            <img src="../../assets/home/new-home/kikoverse.png" alt="" />
            <span>Fishing Crypto with kiko</span>
          </div>
        </div>
        <div class="bottom-right">
          <ul>
            <li v-for="(item, index) in state.mediumList" :key="index">
              <div class="img-wrap">
                <img :src="item.img" alt="" />
              </div>
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="data-wrap">
      <ul>
        <li v-for="(item, index) in state.dataList" :key="index">
          <div>
            <span>$</span>
            <span>{{ item.count }}</span>
          </div>
          <span class="desc">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let state = reactive({
  mediumList: [
    {
      img: require("../../assets/home/new-home/twitter.png"),
      text: "Twitter",
    },
    {
      img: require("../../assets/home/new-home/telegram.png"),
      text: "Telegram",
    },
    {
      img: require("../../assets/home/new-home/medium.png"),
      text: "Medium",
    },
    {
      img: require("../../assets/home/new-home/medium.png"),
      text: "discord",
    },
  ],
  dataList: [
    {
      count: "123,456",
      text: "Total Value Locked",
    },
    {
      count: "123,456",
      text: "Total Trading",
    },
    {
      count: "123,456",
      text: "VolumeHolders",
    },
  ],
});
</script>
<style lang="scss" scoped>
.seven-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .bg {
    width: 80%;
    height: 100%;
  }
  .coin {
    width: 474px;
    height: 400px;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
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
            .img-wrap {
              width: 32px;
              height: 32px;
              background: rgba(209, 210, 222, 0.2);
              border-radius: 50%;
              position: relative;
              img {
                width: 19px;
                height: 15px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
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
  .data-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ul {
      display: flex;
      width: 906px;
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
        & > span {
          margin-top: 12px;
          font-size: 14px;
          font-family: Denmark;
          color: #ffffff;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
