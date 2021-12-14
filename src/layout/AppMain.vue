<template>
  <section :class="$style['app-main']">
    <router-view v-slot="{ Component }" :key="route.path">
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <slot></slot>
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </section>
</template>

<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import utilsFormat from "@utils/format";
watchEffect(() => {
  document.title =
    utilsFormat.computedLangCtx(route.meta.title).value + " | KikoSwap";
});
</script>

<style lang="scss" module>
.app-main {
  padding-top: 24px;
}
</style>
