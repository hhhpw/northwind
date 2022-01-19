<template>
  <div :class="$style['hero-info']">
    <div :class="$style['hero-info-mask']">
      <!-- @click.stop.prevent="
        store.commit('StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS', {
          dialogVisible: true,
          text: $t('不可点击'),
        })
      " -->
      <div
        v-if="state.metaData.occupations"
        :class="$style['hero-info-occupations']"
      >
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
  .hero-info-mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px;
    transform: scale(0.925, 0.95);
    z-index: 9;
    cursor: not-allowed;
    .hero-info-tips {
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
    }
    .hero-info-occupations {
      overflow: hidden;
      width: 90%;
      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      .hero-info-occupations-item {
        width: 25%;
        margin-left: 6%;
        float: left;
        text-align: center;
        position: relative;
        border-radius: 4px;
      }
      img {
        display: inline-block;
        width: 100%;
        // width: 94px;
        // height: 78px;
      }
      p {
        color: #fff;
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
  }
}
</style>
