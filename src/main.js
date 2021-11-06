import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import animated from "animate.css";
import _app_directive from "@src/directive/index";
import _app_element_ui from "@utils/element";
import "element-plus/dist/index.css";
import "@styles/index.scss"; // global css

const app = createApp(App);
_app_directive(app);
_app_element_ui(app);

app.use(animated);

app.use(store).use(router).use(i18n).mount("#app");
