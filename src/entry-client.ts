// src/entry-client.ts
import { createApp } from "./entry-server";
import "./style.css";

const { app, router, pinia } = createApp();

// Restore the pre-serialized Pinia state without JSON.parse.
if (window.__PINIA_STATE__) {
    pinia.state.value = window.__PINIA_STATE__;
}

router.isReady()
    .then(() => {
        // Hydrate the SSR-rendered markup.
        app.mount("#app", true);
    })
    .catch((err) => {
        console.error("Client hydration failed:", err);
    });