<template>
  <section
    :class="route.path === '/' ? $style['app-main-home'] : $style['app-main']"
  >
    <router-view v-slot="{ Component }" :key="route.path">
      <slot></slot>
      <component :is="Component" />
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
.app-main-home {
  width: 100%;
  height: calc(100vh - 74px);
  padding-top: 74px;
}
.app-main {
  margin: 0 auto;
  margin-top: 100px;
  width: 1200px;
  padding-bottom: 80px;
  display: grid;
  height: 100%;
}
</style>
