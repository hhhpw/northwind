<template>
  <div
    :class="$style.box"
    @click="
      store.commit('StoreMeta/SET_SELECTOR_DIALOG_PARAMS', {
        dialogVisible: true,
      })
    "
  >
    <svg-icon name="f-clothes" :class="$style['svg']"></svg-icon>
    <p>{{ $t("metaverse.obtain components") }}</p>
  </div>
</template>
<script setup>
import SvgIcon from "@components/SvgIcon/Index.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
<style lang="scss" module>
.box {
  min-width: 102px;
  min-height: 102px;
  background: rgba(216, 216, 216, 0.11);
  border-radius: 4px;
  opacity: 0.98;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .svg {
    width: 18px;
    height: 18px;
  }
  p {
    font-size: 14px;
    color: $theme-light-color;
    cursor: pointer;
  }
}
</style>
