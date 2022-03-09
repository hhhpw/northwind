<!-- pagination -->
<template>
  <div>
    <ElPagination
      class="white-list-tool"
      background
      hide-on-single-page
      :page-size="20"
      layout="prev, pager, next"
      :total="props.assetsList.length"
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
      v-model:currentPage="currentPage"
      @current-change="handleCurrentChange"
      @prev-click="pagiEvent({ type: 'prev', currentPage: currentPage })"
      @next-click="pagiEvent({ type: 'next', currentPage: currentPage })"
    ></ElPagination>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

let props = defineProps({
  assetsList: {
    type: Array,
    default: () => [],
  },
});

let currentPage = ref(1);

const emits = defineEmits(["pageEvent"]);

const pagiEvent = (args) => emits("pageEvent", args);
const handleCurrentChange = (val) => {
  emits("pageEvent", { type: "current", currentPage: val });
};
</script>

<style>
.white-list-tool.is-background .btn-prev {
  width: 48px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-prev:disabled {
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .btn-next {
  width: 48px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-next:disabled {
  background-color: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .el-pager li {
  background-color: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .el-pager li:not(.disabled).active {
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.white-list-tool.is-background .el-pager li:hover {
  color: #fff;
}
.white-list-tool.is-background .el-pager li:not(.disabled):hover {
  color: #fff;
}
.white-list-tool.is-background .el-pager li:not(.disabled).active:hover {
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-next .el-icon-arrow-right {
  margin: 0 auto;
}
.white-list-tool.is-background .btn-prev .el-icon-arrow-left {
  margin: 0 auto;
}
</style>
