<template>
  <div :class="$style['hero-info']">
    <div
      :class="$style['hero-info-mask']"
      @click.stop.prevent="
        store.commit('StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS', {
          dialogVisible: true,
          text: $t('不可点击'),
        })
      "
    ></div>
  </div>
  <validate-error-modal></validate-error-modal>
</template>
<script setup>
import { useStore } from "vuex";
import ValidateErrorModal from "./ValidateErrorModal.vue";
const store = useStore();
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
  }
}
</style>
