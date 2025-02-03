import { createApp } from './entry-server'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')
})
