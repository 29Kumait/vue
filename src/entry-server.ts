// src/entry-server.ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter } from "./router";

export function createApp() {
    const app = createSSRApp(App);
    const pinia = createPinia();
    const router = createRouter(true);

    app.use(pinia);
    app.use(router);

    return { app, router, pinia };
}