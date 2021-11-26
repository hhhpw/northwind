<template>
  <div class="rarevalue-total">
    <div class="total-score">
      <span class="title">{{ $t("得分") }}</span
      ><br />
      <span class="value">{{ rarevalue_total_score }}</span>
    </div>
    <div class="total-ranking">
      <span class="title">{{ $t("得分排名") }}</span>
      <span>({{ props.box_detail?.seriesName }})</span>
      <br />
      <span class="value">{{ rarevalue_total_rank }}</span>
    </div>
  </div>
  <div class="rarevalue-table">
    <template v-if="state.rarevalue_list && state.rarevalue_list.length > 0">
      <div
        class="rarevalue-table-item"
        v-for="(r, i) in state.rarevalue_list"
        :key="i"
      >
        <span class="rarevalue-project">{{ r.title }}</span>
        <span class="rarevalue-project-value">{{ r.value }}</span>
        <span class="rarevalue-project-score">{{ r.score }}</span>
      </div></template
    >
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, watchEffect, reactive, ref } from "vue";
import nftProto from "./nftproto";
let rarevalue_list = ref([]);
let state = reactive({
  rarevalue_list: [],
});
const props = defineProps({
  box_detail: Object,
});

watchEffect(() => {
  if (props.box_detail && props.box_detail.properties) {
    const protos = nftProto(props.box_detail);
    if (protos.properties && protos.properties.value.length) {
      rarevalue_list = protos.properties.value.filter((d) => d.value !== "--");
      state.rarevalue_list = rarevalue_list;
    }
  }
});

// 稀有值分数
const rarevalue_total_score = computed(() => {
  return props.box_detail.score;
});
// 稀有值排名
const rarevalue_total_rank = computed(() => {
  return `${props.box_detail?.rank}/${props.box_detail?.quantity}`;
});
</script>
<style lang="scss" scoped>
.specific-rarevalue {
  .rarevalue-total {
    display: flex;
    margin-bottom: 16px;
    .total-score {
      margin-right: 72px;
    }
    .value {
      margin-top: 6px;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .rarevalue-table {
    max-width: 700px;
    .rarevalue-table-item {
      height: 48px;
      line-height: 48px;
      box-shadow: 0px 0.5px 0px 0px #391b0f;
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
        flex: 1;
      }
    }
  }
}
</style>
