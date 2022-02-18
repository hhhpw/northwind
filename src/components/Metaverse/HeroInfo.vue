<template>
  <div :class="$style['hero-info']">
    <div v-if="state.metaData.occupations" :class="$style['wrap']">
      <div :class="$style['hero-info-skills']">
        <img src="../../assets/metaverse/fire.png" />
        <img src="../../assets/metaverse/ice.png" />
        <img src="../../assets/metaverse/fire.png" />
        <img src="../../assets/metaverse/ice.png" />
      </div>

      <div :class="$style['hero-info-occupations']">
        <div
          v-for="(d, i) in state.metaData.occupations"
          :key="i"
          :class="$style['hero-info-occupations-item']"
        >
          <img :src="d.image" />
          <p :class="$style['hero-info-occupations-item-num']">{{ d.sum }}</p>
          <p>{{ state.currLang === "zh" ? d.cnDesc : d.desc }}</p>
        </div>
      </div>

      <div :class="$style['hero-info-imgs']">
        <img src="../../assets/metaverse/a.png" />
        <img src="../../assets/metaverse/b.png" />
        <img src="../../assets/metaverse/c.png" />
        <img src="../../assets/metaverse/d.png" />
      </div>
    </div>

    <div :class="$style['hero-info-mask']">
      <!-- @click.stop.prevent="
        store.commit('StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS', {
          dialogVisible: true,
          text: $t('不可点击'),
        })
      " -->

      <p :class="$style['hero-info-tips']">COMING SOON..</p>
    </div>
  </div>
  <validate-error-modal></validate-error-modal>
</template>
<script setup>
/* eslint-disable*/
import { computed, reactive } from "vue-demi";
import { useStore } from "vuex";
import ValidateErrorModal from "./ValidateErrorModal.vue";
const store = useStore();
const state = reactive({
  metaData: computed(() => store.state.StoreMeta.metaData),
  currLang: computed(() => store.state.StoreApp.currLang),
});
</script>
<style lang="scss" module>
.hero-info {
  background-image: url("../../assets/metaverse/right-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 400px;
  margin-left: 30px;
  padding: 30px 45px;
  box-sizing: border-box;
  position: relative;

  .wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;
  }
  .hero-info-skills {
    display: flex;
    justify-content: space-between;
    img {
      width: 70px;
    }
    padding-bottom: 40px;
    border-bottom: 2px solid #f2decb;
  }

  .hero-info-occupations {
    overflow: hidden;
    width: 100%;
    position: relative;
    padding-bottom: 40px;
    margin-top: 30px;
    border-bottom: 2px solid #f2decb;
    // margin-top: 30px;
    // justify-content: flex-start;
    .hero-info-occupations-item {
      // width: 25%;
      // margin-left: 6%;
      margin-right: 6%;
      float: left;
      text-align: center;
      position: relative;
      border-radius: 4px;
    }
    img {
      display: inline-block;
      width: 70px;
    }
    p {
      color: #391b0f;
      font-size: 12px;
    }
    .hero-info-occupations-item-num {
      position: absolute;
      bottom: 25px;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.5);
      width: 60%;
      border-radius: 10px;
      color: #391b0f;
    }
  }

  .hero-info-imgs {
    display: flex;
    margin-top: 30px;
    justify-content: flex-start;
    img {
      width: 70px;
      margin-right: 10px;
    }
    padding-bottom: 40px;
  }

  .hero-info-mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px;
    transform: scale(0.925, 0.95);
    z-index: 9;
    cursor: not-allowed;
    // display: flex;
    // align-items: flex-start;
    .hero-info-tips {
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
    }
  }
}
</style>
