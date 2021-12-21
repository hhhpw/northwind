<template>
  <div :class="$style['game-container']">
    <screen @loadEnd="loadEnd" v-if="!state.isFull"></screen>
    <full-screen v-if="state.isFull"></full-screen>
  </div>
</template>
<script setup>
/* eslint-disable */
import {
  computed,
  onMounted,
  reactive,
  watch,
  nextTick,
  onUnmounted,
} from "vue";
import Screen from "./Screen.vue";
import FullScreen from "./FullScreen.vue";
import { useStore } from "vuex";

const store = useStore();

nextTick(() => {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#f3d789";
});
store.dispatch("StoreIGO/getIgoList");
let state = reactive({
  isFull: false,
});
const loadEnd = () => {
  state.isFull = true;
};

onUnmounted(() => {
  document.getElementsByTagName("body")[0].style.backgroundColor = "#f9efe4";
});
</script>
<style lang="scss" module>
// ::-webkit-scrollbar {
//   width: 3px;
//   height: 3px;
// }
// ::-webkit-scrollbar-track {
//   border-radius: 10px;
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
//   background: rgba(0, 0, 0, 0.7);
// }
.game-container {
  width: 100%;
}
</style>
