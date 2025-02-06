import { createApp } from './entry-server'
import './style.css'

const { app, router, pinia } = createApp(false)

// Hydrate Pinia from SSR if you inserted state into window.__PINIA
if (window.__PINIA) pinia.state.value = JSON.parse(window.__PINIA)

router.isReady().then(() => {
    // Hydrate the SSR-generated HTML
    app.mount('#app', true)
}).catch(err => {
    console.error('Router is not ready:', err)
});
