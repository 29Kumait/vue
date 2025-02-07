// server.js

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import serialize from "serialize-javascript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();

  let template, createApp;

  if (isProd) {
    // Serve static assets from the client build output.
    app.use(express.static(path.resolve(__dirname, "../dist/client")));
    // Read and cache the HTML template.
    template = await fs.readFile(
      path.resolve(__dirname, "../dist/client/index.html"),
      "utf-8"
    );

    // Pre-built SSR bundle.
    const ssrModule = await import("../dist/server/entry-server.js");

    createApp = ssrModule.createApp;
  } else {
    // In development mode, create Vite in middleware mode.
    const vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    app.use(vite.middlewares);

    // Read and transform the index.html on each request.
    const rawTemplate = await fs.readFile(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );

    template = await vite.transformIndexHtml("/", rawTemplate);
    // Load the SSR module fresh on every request.
    createApp = (await vite.ssrLoadModule("/src/entry-server.ts")).createApp;
  }

  app.use("*", async (req, res) => {
    try {
      const URL = req.originalUrl;
      // 1. Create a fresh app instance per request.
      const { app: vueApp, router, pinia } = createApp();
      // 2. Set up the router.
      router.push(URL);
      await router.isReady();
      // 3. (Optional) Call asyncData hooks on matched components if needed.
      const matched = router.currentRoute.value.matched;

      await Promise.all(
        matched.map((record) => {
          const asyncData = record.components?.default?.asyncData;
          return asyncData
            ? asyncData({ pinia, route: router.currentRoute.value })
            : null;
        })
      );

      // 4. Render the Vue app to HTML.
      const { renderToString } = await import("vue/server-renderer");
      const appHtml = await renderToString(vueApp);
      // 5. Serialize the Pinia state. Since we use serialize with { isJSON: true }, the value is directly a valid JS object.
      const state = serialize(pinia.state.value, { isJSON: true });
      // 6. Inject the rendered app and state into the HTML template.
      const html = template
        .replace("<!--app-html-->", appHtml)
        .replace(
          "<!--pinia-state-->",
          `<script>window.__PINIA_STATE__ = ${state}</script>`
        );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      console.error(`Error rendering ${req.originalUrl}:`, error);
      res.status(500).end(error.message);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

startServer();
