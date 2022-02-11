<template>
  <div class="star-selector">
    <ElSelect
      :suffix-icon="SelectSuffix"
      :popper-append-to-body="false"
      v-model="state.value"
    >
      <ElOption
        v-for="i in props.items"
        :key="i.value"
        :label="i.label"
        :value="i.value"
        @click="emit(i)"
      ></ElOption>
    </ElSelect>
  </div>
</template>
<script setup>
import { defineProps, reactive } from "vue";
import SelectSuffix from "@components/SelectSuffix.vue";
let state = reactive({
  value: "",
});
const props = defineProps({
  items: {
    default: () => [],
    type: Array,
  },
});
const emits = defineEmits(["emit"]);
const emit = (i) => {
  state.value = i.value;
  emits("emit", i);
};
</script>
<style scoped></style>
