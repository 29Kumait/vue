import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter } from './router/index'

export function createApp(isServer = true) {
    // 1) Create app in SSR mode
    const app = createSSRApp(App)

    // 2) Create fresh Pinia + a fresh router
    const pinia = createPinia()
    const router = createRouter(isServer)

    // 3) Register them
    app.use(pinia)
    app.use(router)

    // 4) Return them so server can render
    return { app, router, pinia }
}
