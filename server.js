const express = require('express')
const { createServer: createViteServer } = require('vite')
const { renderToString } = require('@vue/server-renderer')

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      const { createApp } = await vite.ssrLoadModule('/src/entry-server.ts')
      const { app: vueApp, router } = createApp()
      router.push(url)
      await router.isReady()
      const appHtml = await renderToString(vueApp)
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Vue SSR App</title>
          </head>
          <body>
            <div id="app">${appHtml}</div>
            <script type="module" src="/src/entry-client.ts"></script>
          </body>
        </html>
      `
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('SSR Server running at http://localhost:3000')
  })
}

createServer()
