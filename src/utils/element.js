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
];

export default (app) => {
  EleUI.forEach((ui) => app.use(ui));
};
