<template>
  <div class="details">
    <div class="details-info">
      <left-content
        :box_detail="props.box_detail"
        :type="props.type"
      ></left-content>
      <Info
        :box_detail="props.box_detail"
        :blind_box_type="props.blind_box_type"
        :action_type="props.action_type"
      ></Info>
    </div>
    <div class="content">
      <details-content
        :box_detail="props.box_detail"
        :blind_box_type="props.blind_box_type"
      ></details-content>
    </div>
  </div>
</template>
<script setup>
import LeftContent from "./DetailsUI/NFTLeftContent.vue";
import Info from "./DetailsUI/NFTInfo.vue";
import detailsContent from "./DetailsUI/NFTContent.vue";
import { defineProps } from "vue";

let props = defineProps({
  box_detail: {
    type: Object,
    default: () => {},
  },
  action_type: String, // 操作类型
  blind_box_type: String, // box或是nft
  type: {
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.details {
  padding-bottom: 80px;
  .details-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
