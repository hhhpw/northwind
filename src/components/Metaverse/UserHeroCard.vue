<template>
  <div :class="$style['hero-card']">
    <div :class="$style['hero-card-box']" v-if="state.heroInfo">
      <img src="../../assets/metaverse/threed.png" :class="$style['three-d']" />
      <img :class="$style['hero-img']" :src="state.heroInfo.imageUrl" />
      <div :class="$style['hero-card-box-shadow']">
        <svg-icon
          :name="state.heroInfo?.gender === 1 ? 'male' : 'female'"
        ></svg-icon>
        <span>{{ state.heroInfo?.customName }}</span>
        <span>
          {{ renderOccupation }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  heroInfo: computed(() => store.state.StoreMeta.heroInfo),
  currLang: computed(() => store.state.StoreApp.currLang),
  metaData: computed(() => store.state.StoreMeta.metaData),
});

const renderOccupation = computed(() => {
  if (!state.metaData) return;
  if (state.currLang === "zh") {
    return state.metaData.occupations.filter(
      (d) => d.desc === state.heroInfo.occupation
    )[0]?.cnDesc;
  }
  return state.heroInfo.occupation;
});
</script>
<style lang="scss" module>
.hero-card {
  width: 600px;
  height: 600px;
  background-image: url("../../assets/metaverse/left-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .hero-card-box {
    width: 530px;
    height: 530px;
    position: relative;
    .three-d {
      position: absolute;
      right: 10px;
      top: 5px;
      z-index: 2;
    }
    .hero-img {
      height: 100%;
      transform: scale(1, 1.03);
    }
    .hero-card-box-shadow {
      width: 227px;
      height: 39px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 22px;
      color: #fff;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%, 0);
      line-height: 39px;
      text-align: center;
      span {
        display: inline-block;
        margin-left: 3px;
      }
      // right: 0;
      // left: 0;
    }
  }
}
</style>
