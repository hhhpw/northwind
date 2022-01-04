<template>
  <div class="meta-error-validate-modal">
    <ElDialog
      :model-value="state.callBackDialogParams.dialogVisible"
      custom-class="star-dialog-el"
      width="458px"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal="true"
      :show-close="false"
    >
      <div class="content">
        <p>
          {{
            $t(
              "the role card name is 0-10 English characters or special symbols"
            )
          }}
        </p>
        <star-button class="button" type="red" @click="handleClose">
          {{ $t("确认") }}
        </star-button>
      </div>
    </ElDialog>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import StarButton from "@StarUI/StarButton.vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  callBackDialogParams: computed(
    () => store.state.StoreMeta.callBackDialogParams
  ),
});

const handleClose = () => {
  store.commit("StoreMeta/SET_CALLBACK_DIALOG_PARAMS_STATUS", {
    dialogVisible: false,
  });
};
</script>
<style lang="scss" scoped>
.meta-error-validate-modal {
  ::v-deep(.el-dialog) {
    border-radius: 8px;
    .el-dialog__headerbtn:focus .el-dialog__close,
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: $btn-orange-bgcolor;
    }
  }
  ::v-deep(.el-dialog__body) {
    padding-top: 0px !important;
  }
  .star-dialog-el {
    ::v-deep(.el-dialog__header) {
      text-align: left !important;
    }
  }
  .content {
    width: 100%;
    p {
      width: 100%;
      text-align: center;
      // color: #391b0f;
      font-size: 16px;
      margin: 60px 0px;
    }
    .button {
      width: 70%;
      margin-left: 15%;
      padding-right: 0px;
      padding-left: 0px;
      font-size: 16px;
      border-radius: 10px;
    }
  }
}
</style>
