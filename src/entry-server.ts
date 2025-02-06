import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter } from './router/index'

export function createApp(isServer = true) {
    const app = createSSRApp(App)

    const pinia = createPinia()
    const router = createRouter(isServer)

    app.use(pinia)
    app.use(router)

    return { app, router, pinia }
}
