<template>
  <div :class="$style['total-data-container']">
    <div>
      <p>{{ $t("nftmining.total-mining-power") }}</p>
      <star-amount :value="312" displaySuffix="kiko"></star-amount>

      <!-- <star-amount :value="1312"></star-amount> -->
    </div>
    <span>{{ $t("平均年化收益") }}</span>
    <span>{{ $t("日产量") }}</span>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarAmount from "@StarUI/StarAmount.vue";
</script>
<style lang="scss" module>
.total-data-container {
  // color: red;
  position: absolute;
  width: 335px;
  height: 150px;
  border: 1px solid red;
  color: #fff;
  top: 50px;
  left: 65px;
}
</style>
