import { createApp } from './entry-server'
import './style.css'

let isHydrated = false; // P5fd5

// 1) Create the app in "client mode"
const { app, router, pinia } = createApp(false)

// 2) Hydrate Pinia from SSR if you inserted state into window.__PINIA
if (window.__PINIA) pinia.state.value = JSON.parse(window.__PINIA)

router.isReady().then(() => {
    if (!isHydrated) { // P5fd5
        // 3) Hydrate the SSR-generated HTML
        app.mount('#app', true)
        isHydrated = true; // P5fd5
    }
})
