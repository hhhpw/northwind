<template>
  <ElTooltip effect="light" placement="right">
    <template #content>
      <div :class="$style['tip-item']">
        <span :class="$style['tip-item-label']">
          {{ $t("farms.farm-liquidity-list-apr-tip-simpleyear") }}
        </span>
        <star-amount
          :value="232.2"
          :formatOptions="{
            precision: 2,
            trailingZero: false,
            percentStyle: true,
          }"
          :isShowTradeColor="true"
        >
        </star-amount>
      </div>
      <div :class="$style['tip-item']">
        <span :class="$style['tip-item-label']">
          {{ $t("farms.farm-liquidity-list-apr-tip-comflexyear") }}
        </span>
        <star-amount
          :value="232.2"
          :formatOptions="{
            precision: 2,
            trailingZero: false,
            percentStyle: true,
          }"
          :isShowTradeColor="true"
        >
        </star-amount>
      </div>
      <p :class="$style['tip-desc']">
        {{ $t("farms.farm-liquidity-list-apr-desc") }}
      </p>
    </template>
    <template #default>
      <svg-icon name="question" class="question"></svg-icon>
    </template>
  </ElTooltip>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarAmount from "@StarUI/StarAmount";
</script>
<style lang="scss" module>
.tip-item {
  color: #3f1c09;
  font-size: 14px;
  margin-top: 5px;
  .tip-item-label {
    margin-right: 10px;
  }
}
.tip-desc {
  margin-top: 10px;
  color: #3f1c09;
  font-size: 14px;
}
</style>
