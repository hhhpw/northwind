<template>
  <section :class="$style['app-main']">
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
.app-main {
  margin: 0 auto;
  margin-top: 70px;
  width: 1400px;
  // border: 1px solid red;
}
</style>
