import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(router)
  return { app, router }
}
