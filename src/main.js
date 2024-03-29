import { createApp } from "vue";
import "./assets/main.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
const pinia = createPinia();
pinia.use((context) => {
  context.store.$onAction((action) => {
    console.log("Action triggered:", action);
  });
});
createApp(App).use(store).use(router).use(pinia).mount("#app");
