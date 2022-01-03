<template>
  <div :class="$style.wrap">
    <role></role>
    <div :class="$style.main">
      <element-panel></element-panel>
      <compose-panel></compose-panel>
    </div>
  </div>

  <selector-modal :dialogParams="state.selectorDialogParams"></selector-modal>
</template>
<script setup>
import { computed, reactive } from "vue";
import Role from "@components/Metaverse/Role.vue";
import ElementPanel from "./ElementPanel.vue";
import ComposePanel from "./ComposePanel.vue";
import SelectorModal from "@components/Metaverse/SelectorModal.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  selectorDialogParams: computed(
    () => store.state.StoreMeta.selectorDialogParams
  ),
});
</script>
<style lang="scss" module>
.wrap {
  width: 1100px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid red;
  .main {
    display: flex;
  }
}
</style>
