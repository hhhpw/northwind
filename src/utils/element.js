import {
  ElInput,
  ElTooltip,
  ElEmpty,
  ElDialog,
  ElNotification,
  ElInputNumber,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElInfiniteScroll,
  ElSelect,
  ElOption,
  ElPagination,
} from "element-plus";

const EleUI = [
  ElInput,
  ElTooltip,
  ElEmpty,
  ElDialog,
  ElNotification,
  ElInputNumber,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElInfiniteScroll,
  ElSelect,
  ElOption,
  ElPagination,
];

export default (app) => {
  EleUI.forEach((ui) => app.use(ui));
};
