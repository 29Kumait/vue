// server.js (Production‑Ready)
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import serialize from "serialize-javascript";
import rateLimit from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

// Add rate limiter to all requests

async function startServer() {
  const app = express();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
  let template;

  let createApp; // function to create a fresh app instance per request

  if (isProd) {
    // Serve static files from the client build output.
    app.use(express.static(path.resolve(__dirname, "../dist/client")));

    // Read and cache the HTML template from the built client folder.
    template = await fs.readFile(
      path.resolve(__dirname, "../dist/client/index.html"),
      "utf-8"
    );

    // Import the pre‑built SSR bundle.
    const ssrModule = await import("../dist/server/entry-server.js");
    createApp = ssrModule.createApp;
  } else {
    // In development mode, create the Vite server in middleware mode.
    const vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });
    app.use(vite.middlewares);

    // Read the index.html from project root and transform it with Vite.
    const rawTemplate = await fs.readFile(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );
    template = await vite.transformIndexHtml("/", rawTemplate);

    // Load the SSR entry module on each request.
    createApp = (await vite.ssrLoadModule("/src/entry-server.ts")).createApp;
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      // 1. Create a fresh app instance for every request.
      const { app: ssrApp, router, pinia } = createApp();

      // 2. Set up the router.
      router.push(url);
      await router.isReady();

      // 3. Run any asyncData hooks (if defined) on matched components.
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
      const appHtml = await renderToString(ssrApp);

      // 5. Safely serialize the Pinia state.
      const state = serialize(pinia.state.value, { isJSON: true });

      // 6. Inject the rendered app and state into the HTML template.
      const html = template
        .replace("<!--app-html-->", appHtml)
        .replace(
          "<!--pinia-state-->",
          `<script>window.__PINIA_STATE__ = ${state}</script>`
        );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      // In development, try to fix Vite's stacktrace for easier debugging.
      if (!isProd) {
        // (vite.ssrFixStacktrace(err) could be used here if vite instance is in scope)
      }
      console.error("Error rendering %s:", req.originalUrl, err);
      res.status(500).end(err.message);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => `Server running on http://localhost:${port}`);
}

startServer();
