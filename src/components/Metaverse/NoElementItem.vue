<template>
  <div
    :class="$style.box"
    @click="
      store.commit('StoreMeta/SET_SELECTOR_DIALOG_PARAMS', {
        dialogVisible: true,
      })
    "
  >
    <svg-icon name="clothes" :class="$style['svg']"></svg-icon>
    <p>{{ $t("metaverse.obtain components") }}</p>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
<style lang="scss" module>
.box {
  min-width: 102px;
  min-height: 102px;
  background: rgba(251, 128, 0, 0.06);
  border-radius: 4px;
  opacity: 0.98;
  border: 1px dashed rgba(251, 128, 0, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .svg {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: 14px;
    color: #fb8000;
    cursor: pointer;
  }
}
</style>
