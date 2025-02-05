import { createApp } from './entry-server'
import './style.css'

// 1) Create the app in "client mode"
const { app, router, pinia } = createApp()

// 2) Hydrate Pinia from SSR if you inserted state into window.__PINIA_STATE__
if (window.__PINIA_STATE__) pinia.state.value = window.__PINIA_STATE__ as any

router.isReady().then(() => {
    // 3) Hydrate the SSR-generated HTML
    app.mount('#app', true)
})
