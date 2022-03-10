<template>
  <div class="special-bg">
    <SvgIcon
      name="beathImage"
      class="beathImage"
      :style="`transform: translate(${pos.left}px, ${pos.top}px)`"
    ></SvgIcon>
    <SvgIcon
      name="gradient"
      class="gradient"
      :style="`transform: translate(${posGradient.left}px, ${posGradient.top}px)`"
    ></SvgIcon>
    <div class="animation" v-if="props.showSquare">
      <SvgIcon name="squareLeft" class="squareLeft"></SvgIcon>
      <SvgIcon name="squareMiddle" class="squareMiddle"></SvgIcon>
      <SvgIcon name="squareRight" class="squareRight"></SvgIcon>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, defineProps } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import { debounce } from "lodash";
const props = defineProps({
  showSquare: {
    type: Boolean,
    default: () => false,
  },
});
const pos = reactive({
  left: -500,
  top: -256,
});
const posGradient = reactive({
  left: -1112,
  top: -1010,
});
let open = true;
const debouMove = debounce((e) => {
  const clientWidth = document.documentElement.clientWidth;
  const scroll_top = document.documentElement.scrollTop;
  if (open) {
    if (clientWidth / 2 > e.pageX) {
      return;
    }
    open = false;
  } else {
    if (clientWidth / 2 < e.pageX) {
      return;
    }
    open = true;
  }
  pos.left = e.pageX - 500;
  pos.top = e.pageY - scroll_top - 256;

  posGradient.left = e.pageX - 1112;
  posGradient.top = e.pageY - scroll_top - 1010;
});
onMounted(() => {
  document.addEventListener("mousemove", debouMove);
});
onBeforeMount(() => {
  document.removeEventListener("mousemove", debouMove);
});
</script>

<style lang="scss" scoped>
.special-bg {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  // 硬件加速
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  .beathImage {
    position: absolute;
    // top: v-bind("pos.top");
    // left: v-bind("pos.left");
    width: 1000px;
    height: 512px;
    animation: 3s infinite beath;
    transform-origin: 50% 50%;
    transition: 50s all linear;
    left: 0;
    top: 0;
  }
  .gradient {
    position: absolute;
    left: 0;
    top: 0;
    // top: 100px;
    // left: 100px;
    width: 2225px;
    height: 2020px;
    transition: 50s all linear;
  }
  .animation {
    position: relative;
    margin-left: -692px;
    .squareLeft {
      width: 152px;
      height: 245px;
      animation: 3s ease-in-out 1s infinite normal none running bRTaPl;
    }
    .squareMiddle {
      width: 32px;
      height: 68px;
      position: absolute;
      left: 2px;
      top: 77px;
      animation: 3s ease-in-out 0.66s infinite normal none running dwSZFG;
    }
    .squareRight {
      width: 135px;
      height: 138px;
      left: 62px;
      top: 54px;
      position: absolute;
      animation: 3s ease-in-out 0.33s infinite normal none running uvIwZ;
    }
  }
}

@keyframes beath {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@keyframes bRTaPl {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(5px, 30px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes dwSZFG {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(8px, 16px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes uvIwZ {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(9px, 11px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
