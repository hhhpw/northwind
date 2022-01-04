<template>
  <div :class="$style['compose-container']" class="compose-container">
    <star-space :size="15"></star-space>
    <div :class="$style['role-box']">
      <img src="../../assets/metaverse/right-empty-box.png" />
    </div>
    <star-space :size="20"></star-space>
    <div :class="$style['info-box']">
      <ElInput placeholder="输入名字" v-model="state.nameValue"> </ElInput>
      <star-space :size="20"></star-space>
      <div :class="$style['detail-info']" class="detail-info">
        <div :class="$style['role-gender']">
          <div
            v-for="(d, i) in state.svgNames"
            :key="i"
            @click="selectGender(d)"
            :class="[
              $style['role-gender-item'],
              $style[`role-gender-${d}`],
              $style[state.gender === d ? 'selected-gender' : ''],
            ]"
          >
            <svg-icon :name="d"></svg-icon>
          </div>
        </div>
        <ElSelect
          v-model="state.professionValue"
          :suffix-icon="selectSuffixIcon"
          :popper-append-to-body="false"
        >
          <ElOption
            v-for="d in state.professionOpts"
            :key="d.value"
            :label="d.label"
            :value="d.value"
          ></ElOption>
        </ElSelect>
      </div>
      <star-space :size="20"></star-space>
      <star-button :class="$style['create-btn']" type="dark">{{
        $t("metaverse.generate NFT character cards")
      }}</star-button>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, watch } from "vue";
import StarButton from "@StarUI/StarButton.vue";
import SvgIcon from "@components/SvgIcon/Index.vue";
import StarSpace from "@StarUI/StarSpace.vue";
import test from "./test.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  currLang: computed(() => store.state.StoreApp.currLang),
  svgNames: ["male", "female"],
  gender: "male",
  nameValue: "",
  professionValue: 1,
  professionOpts: computed(() => [
    { value: 1, label: "战士" },
    { value: 2, label: "法师" },
    { value: 3, label: "刺客" },
    { value: 4, label: "猎人" },
    { value: 5, label: "牧师" },
    { value: 6, label: "圣骑士" },
    { value: 7, label: "德鲁伊" },
  ]),
});

const selectGender = (gender) => {
  state.gender = gender;
};

const selectSuffixIcon = () => {
  return <SvgIcon name="male"></SvgIcon>;
};
</script>

<style lang="scss" scoped>
$bgColor: rgba(235, 213, 189, 1);
$borderColor: #ebd5bd;
$fontColor: #391b0f;
$bgColor2: #fcf7f1;
.compose-container {
  ::v-deep(.el-input) {
    border: none;
    border-color: transparent;
    width: 245px;
    height: 40px;
  }
  ::v-deep(.el-input::hover) {
    border: none;
    border-color: transparent;
  }
  ::v-deep(.el-input__inner) {
    background: $bgColor;
    border: none;
    color: $fontColor;
    height: 40px;
  }
  ::v-deep(.el-input__inner:focus) {
    border: none;
    border-color: transparent;
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: $fontColor;
  }
}
.detail-info {
  ::v-deep(.el-input) {
    border: none;
    width: 130px;
    border: 1px solid $borderColor;
    border-radius: 8px;
    overflow: hidden;
    background-color: $bgColor2;
    height: 32px;
  }
  ::v-deep(.el-input::hover) {
    border: 1px solid $borderColor;
  }
  ::v-deep(.el-input__inner) {
    background: #fff;
    height: 32px;
    color: $fontColor;
    background-color: $bgColor2;
  }
  ::v-deep(.el-input__inner:focus) {
    // border: 1px solid #ebd5bd;
  }
  ::v-deep(.el-input__inner::placeholder) {
    color: $fontColor;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]) {
    border: none;
  }
  ::v-deep(.el-select-dropdown) {
    background-color: #fcf7f1;
    border: none;
    .el-select-dropdown__item.selected {
      color: $fontColor;
      background-color: $borderColor;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      color: $fontColor;
      background-color: $borderColor;
    }
  }
  ::v-deep(.el-popper.is-light .el-popper__arrow::before) {
    background-color: $bgColor2;
  }
  ::v-deep(.el-select__popper.el-popper[role="tooltip"]
      .el-popper__arrow::before) {
    border: none;
  }
}
</style>
<style lang="scss" module>
.compose-container {
  background-image: url("../../assets/metaverse/right-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 540px;
  padding: 30px 45px;
  box-sizing: border-box;
  .role-box {
    position: relative;
    width: 304px;
    text-align: center;
    height: 304px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info-box {
    // margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .detail-info {
      display: flex;
      width: 245px;
      justify-content: space-between;
      .role-gender {
        display: flex;
        .role-gender-item {
          width: 40px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border: 1px solid #f3e6d7;
          transition: all ease 0.2s;
          color: #391b0f;
          &.selected-gender {
            background: #fb8000;
            color: #ffffff;
          }
        }
        .role-gender-male {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: none;
        }
        .role-gender-female {
          background: #fcf7f1;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
    .create-btn {
      width: 245px;
      padding: 0px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
