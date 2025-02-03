import { createApp } from './entry-server'
import './style.css'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')
})
