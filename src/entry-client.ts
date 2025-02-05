// src/entry-client.ts
import { createApp } from "./entry-server";
import "./style.css";

const { app, router, pinia } = createApp();

// Directly assign the pre-serialized state if it exists.
if (window.__PINIA_STATE__) {
    pinia.state.value = JSON.parse(window.__PINIA_STATE__);

}

router.isReady()
    .then(() => {
        app.mount("#app", true);
    })
    .catch((error) => {
        return (error);
    });
