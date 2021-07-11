import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import en from "../src/translations/en.json";
import id from "../src/translations/id.json";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    id,
  },
  fallbackLocale: "en",
});

createApp(App).use(router).use(i18n).mount("#app");
