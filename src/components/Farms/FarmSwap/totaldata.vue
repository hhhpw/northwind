<template>
  <div :class="$style['container-total-data']">
    <div :class="$style['container-total-data-content']">
      <div
        :class="$style['container-total-data-content-item']"
        v-for="(d, i) in state.dataSource"
        :key="i"
      >
        <p :class="$style['container-total-data-content-item-title']">
          {{ $t(`farm-swap-total-${i + 1}`) }}
        </p>
        <star-amount
          :value="d"
          displayPreFix="$"
          :class="$style['container-total-data-content-item-amount']"
          :formatOptions="{
            precision: 2,
            trailingZero: false,
          }"
        ></star-amount>
      </div>
    </div>
    <star-space :size="20"></star-space>

    <p>* {{ $t("container-total-data-desc-1") }}</p>
    <p>* {{ $t("container-total-data-desc-2") }}</p>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import StarAmount from "@StarUI/StarAmount";
import StarSpace from "@StarUI/StarSpace";
let state = reactive({
  dataSource: ["1232131.32132", "9761230231", "23186131", "312397922"],
});
</script>
<style lang="scss" module>
.container-total-data {
  padding: 10px 20px 20px;
  // width: 500px;
  color: #391b0f;
  background: #f9efe4;
  font-size: 14px;
  border-radius: 16px;
  .container-total-data-content {
    overflow: hidden;
    padding-top: 10px;
    .container-total-data-content-item {
      // display: flex;
      float: left;
      width: 50%;
      margin-top: 10px;
      .container-total-data-content-item-title {
        margin-bottom: 3px;
      }
      .container-total-data-content-item-amount {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>
