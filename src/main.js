import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "swiper/css";
import "swiper/css/navigation";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

// Inicializar autenticación
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore();
authStore.initialize();
