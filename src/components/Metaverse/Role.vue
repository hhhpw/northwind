<template>
  <div :class="$style['role']">
    <!-- 无角色卡片 -->
    <div
      :class="$style['role-no-character']"
      v-if="!state.composeNFT || state.composeNFT.length < 1"
    >
      <p>
        {{ $t("metaverse.no character nft yet") }}
      </p>
      <p>
        {{ $t("metaverse.character nft making") }}
      </p>
    </div>
    <!-- 角色卡片 -->
    <div :class="$style['role-character']" v-else>
      <div
        @click.stop="pushHeroDetail(d)"
        v-for="(d, i) in state.composeNFT"
        :key="i"
        :class="$style['role-character-item']"
        @mouseenter.stop="hoverEvent(i, true)"
        @mouseleave.stop="hoverEvent(i, false)"
      >
        <div
          :class="$style['role-character-item-mask']"
          :ref="
            (el) => {
              if (el) state.maskDOMs[i] = el;
            }
          "
        >
          <p>{{ d.customName }}</p>
          <p>{{ d.name }}</p>
        </div>
        <img :src="d.image" />
      </div>
      <div :class="$style['role-character-add']" @click="changeMainType">
        <img src="../../assets/metaverse/add-role.png" />
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  maskDOMs: [],
  type: computed(() => store.state.StoreMeta.type),
  composeNFT: computed(() => store.state.StoreMeta.composeNFT),
});
const hoverEvent = (index, flag) => {
  nextTick(() => {
    if (flag) {
      state.maskDOMs[index].style.display = "block";
      return;
    }
    state.maskDOMs[index].style.display = "none";
  });
};
const changeMainType = () => {
  if (state.type === "not-generated") {
    // 清空所有元素
  }
  if (state.type === "generated") {
    store.commit("StoreMeta/CHANGE_MAIN_STATUS", {
      type: "not-generated",
    });
  }
};

const pushHeroDetail = (payload) => {
  if (state.type === "generated") {
    store.commit("StoreMeta/CHANGE_MAIN_STATUS", {
      data: Object.assign({}, payload, {
        imageUrl: payload.image,
      }),
      type: "generated",
    });
  }
  if (state.type === "not-generated") {
    store.commit("StoreMeta/CHANGE_MAIN_STATUS", {
      data: Object.assign({}, payload, {
        imageUrl: payload.image,
      }),
      type: "generated",
    });
  }
};
</script>
<style lang="scss" module>
@import "~@/styles/mixin.scss";

.role {
  // width: 1100px;
  height: 136px;
  background: linear-gradient(180deg, #fef5d3 0%, #f2decb 100%);
  box-shadow: 0px 6px 13px 0px rgba(223, 205, 185, 0.46),
    inset 1px 1px 0px 0px #ffecd4,
    inset -1px -1px 0px 0px rgba(220, 164, 105, 0.36);
  border-radius: 13px;
  display: flex;
  padding: 0px 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
    background-color: #ffecd4;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    width: 80%;
  }
  .role-no-character {
    font-size: 14px;
    color: #8b8b8b;
    align-self: center;
    p:first-child {
      color: #391b0f;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .role-character {
    display: flex;
    align-self: center;
    .role-character-item {
      width: 108px;
      height: 108px;
      border: 2px solid #fff;
      box-sizing: border-box;
      // box-shadow: ;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      &:not(:first-child) {
        margin-left: 15px;
      }
      &:hover {
        cursor: pointer;
      }
      .role-character-item-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        display: none;
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
        p {
          @include textOverflow();
          width: 90%;
        }
      }

      // border: 2px solid #fb8000;
      // cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .role-character-add {
      display: inline-block;
      margin-left: 15px;
      width: 108px;
      height: 108px;
      cursor: pointer;
    }
  }
}
</style>
