<template>
  <div>
    <ElTooltip
      effect="dark"
      :placement="props.placement"
      :append-to-body="false"
    >
      <template #content>
        <span :class="props.contentClassName">
          {{ props.placeString }}
        </span>
      </template>
      <template #default>
        <svg-icon :name="props.svgName" :style="props.svgStyle">></svg-icon>
      </template>
    </ElTooltip>
  </div>
</template>
<script setup>
import SvgIcon from "@components/SvgIcon/Index.vue";
const props = defineProps({
  svgName: {
    type: String,
  },
  placeString: {
    type: String,
  },
  contentClassName: {
    type: String,
  },
  svgStyle: {
    type: Object,
  },
  placement: {
    type: String,
  },
});
</script>
<style lang="scss" class></style>
