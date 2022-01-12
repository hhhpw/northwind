<template>
  <div class="nft-selector" v-if="state.nftSeriesList">
    <div>
      <!-- 系列 -->
      <ElSelect
        v-model="state.nftSeriesValue"
        :suffix-icon="selectSuffixIcon"
        :popper-append-to-body="false"
      >
        <ElOption
          v-for="d in state.nftSeriesList"
          :key="d.value"
          :label="d.label"
          :value="d.value"
        ></ElOption>
      </ElSelect>
      <!-- 类型 -->
      <ElSelect
        class="type-select"
        v-model="state.nftTypeValue"
        :suffix-icon="selectSuffixIcon"
        :popper-append-to-body="false"
      >
        <ElOption
          v-for="d in state.nftTypesList"
          :key="d.value"
          :label="d.label"
          :value="d.value"
        ></ElOption>
      </ElSelect>
    </div>

    <div class="nft-selector-sort" @click="changeSortDir">
      <div class="sort-item">
        <img
          src="../../assets/nft/arrow-up.png"
          v-if="state.sortDirValue === 'desc'"
        />
        <img
          src="../../assets/nft/arrow-down.png"
          v-if="state.sortDirValue === 'asc'"
        />
      </div>
      <!-- 排序类别 -->
      <ElSelect
        class="sort-select"
        v-model="state.sortRule"
        :suffix-icon="selectSuffixIcon"
        :popper-append-to-body="false"
      >
        <ElOption
          v-for="d in state.sortList"
          :key="d.value"
          :label="d.label"
          :value="d.value"
        ></ElOption>
      </ElSelect>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import commonApi from "@api/common";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
import SvgIcon from "@components/SvgIcon/Index.vue";
import { nftTypesList, sortList } from "./selector.js";

const emits = defineEmits(["filterEvent"]);
const state = reactive({
  nftSeriesList: null,
  nftSeriesValue: "",
  nftTypesList: nftTypesList,
  nftTypeValue: "",
  sortList: sortList,
  sortRule: "ctime",
  sortDirValue: "asc",
  initLoad: true,
});

if (!state.nftSeriesList) {
  commonApi.getNFTSeriesList().then((res) => {
    if (res.code === 200) {
      let result = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        result.push(res.data[i]);
      }
      result.unshift({
        groupId: "",
        groupName: "全部系列",
        seriesName: "全部系列",
      });
      result = result.map((d) => {
        return {
          ...d,
          label: d.groupName,
          value: d.groupId,
        };
      });
      state.nftSeriesList = result;
    }
  });
}

watch(
  () => [
    state.sortRule,
    state.sortDirValue,
    state.nftTypeValue,
    state.nftSeriesValue,
  ],
  (newValues) => {
    const params = {
      sortRule: newValues[0],
      sort: newValues[1] === "asc" ? 1 : 2,
      nftType: newValues[2],
      groupId: newValues[3],
    };
    emits("filterEvent", params);
  },
  {
    deep: true,
    immediate: true,
    flush: "sync",
  }
);

// watchEffect(() => {
// const params = {
//   sortRule: state.sortRule,
//   sort: state.sortDirValue === "asc" ? 1 : 2,
//   nftType: state.nftTypeValue,
//   groupId: state.nftSeriesValue,
// };
//   console.log("params", params);
//   emits("filterEvent", params);
// });

const selectSuffixIcon = () => {
  return <SvgIcon name="arrow-up-show"></SvgIcon>;
};

const changeSortDir = () => {
  // if (state.sortDirValue) {}
  state.sortDirValue = state.sortDirValue === "asc" ? "desc" : "asc";
};
</script>

<style scoped lang="scss">
$bgColor: linear-gradient(180deg, #fdf8f3 0%, #f9efe4 100%);
$boxShadow: 0px 2px 4px 0px #dfcdb9, inset 0px 1px 0px 0px #ffffff;
$borderColor: #ebd5bd;
$fontColor: #391b0f;
$bgColor2: #fcf7f1;
$hoverColor: #e9ded1;
.nft-selector {
  ::v-deep(.el-input) {
    width: auto;
    border-radius: 8px;
    overflow: hidden;
    background-color: $bgColor2;
    height: 32px;
    border: none;
    box-shadow: $boxShadow;
  }
  ::v-deep(.el-input__inner) {
    background: $bgColor;
    height: 32px;
    color: $fontColor;
    border: none;
  }
  ::v-deep(.el-input__inner:focus) {
    border: none;
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: $fontColor;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]) {
    border: none;
  }
  ::v-deep(.el-select-dropdown) {
    background: linear-gradient(180deg, #fdf8f3 0%, #f9efe4 100%);
    box-shadow: $boxShadow;
    border: none;
    .el-select-dropdown__item.selected {
      color: $fontColor;
      background-color: $hoverColor;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      color: $fontColor;
      background: $hoverColor;
    }
  }
  ::v-deep(.el-popper.is-light .el-popper__arrow::before) {
    background-color: $bgColor2;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]
      .el-popper__arrow::before) {
    border: none;
  }
  .type-select {
    margin-left: 20px;
    width: 180px;
  }
  .sort-select {
    width: 120px;
  }
}
.nft-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .nft-selector-sort {
    display: flex;
    align-items: center;
    .sort-item {
      cursor: pointer;
      width: 32px;
      height: 32px;
      background: linear-gradient(180deg, #fdf8f3 0%, #f9efe4 100%);
      box-shadow: 0px 2px 4px 0px #dfcdb9, inset 0px 1px 0px 0px #ffffff;
      border-radius: 8px;
      text-align: center;
      line-height: 32px;
      margin-right: 6px;
      img {
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss" module></style>
