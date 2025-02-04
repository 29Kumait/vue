import { createApp } from './entry-server'
import './style.css'

// 1) Create the app in "client mode"
const { app, router, pinia } = createApp(false)

// 2) Hydrate Pinia from SSR if you inserted state into window.__PINIA
if (window.__PINIA) pinia.state.value = JSON.parse(window.__PINIA)

router.isReady().then(() => {
    // 3) Hydrate the SSR-generated HTML
    app.mount('#app', true)
})
