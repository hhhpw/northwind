<template>
  <div :class="$style['container-person-data']"></div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import StarButton from "@StarUI/StarButton";
let state = reactive({
  data: ["23412231.12"],
});
</script>
<style lang="scss" module>
.container-person-data {
  color: #391b0f;
  background: #f9efe4;
  padding: 10px 20px 20px;
  // width: 400px;
  font-size: 14px;
  border-radius: 16px;
}
</style>
