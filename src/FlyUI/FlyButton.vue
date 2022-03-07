<template>
  <button class="fly-button" :class="{ [props.type]: true }">
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "normal",
  },
});
</script>
<style lang="scss" scoped>
$normal-bg-color: linear-gradient(256deg, #fdd300 0%, #fba800 100%);
$text-brow-color: #744600;
.fly-button {
  padding: 15px 25px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 8px;
  box-sizing: content-box;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease-in-out;
  }
}
.fly-button.normal {
  color: $text-brow-color;
  background-color: $normal-bg-color;
  box-shadow: 0px 12px 15px 0px rgba(253, 168, 0, 0.39);
}
.fly-button.dark {
  color: $white;
  background-color: transparent;
  background-color: $theme_gray_color;
}
.fly-button.danger_ghost {
  color: $theme_danger_color;
  background-color: transparent;
  border: 1px solid $theme_danger_color;
}
.fly-button.success_ghost {
  color: $theme_light-color;
  // background-color: $theme_gray_color;
  border: 1px solid $theme_light-color;
}
.fly-button.light {
  color: $text-orange-color;
  border: 1px solid $border-orange-color;
  padding: 14px 25px;
  background-color: #fff;
}
.fly-button.disabled {
  background: $gray_light;
  color: $black;
}
</style>
