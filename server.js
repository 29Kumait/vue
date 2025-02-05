// server.js
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import serialize from "serialize-javascript";
import rateLimit from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();

  // Optional rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  let template;
  let createApp; // Will hold the SSR createApp function

  if (isProd) {
    // 1. Serve static files from the compiled client folder,
    //    but disable directory indexing.
    app.use(
      express.static(path.resolve(__dirname, "../dist/client"), {
        index: false, // <== important: no auto "index.html" for subfolders
      })
    );

    // 2. Read the template (the main "index.html") from dist/client.
    template = await fs.readFile(
      path.resolve(__dirname, "../dist/client/index.html"),
      "utf-8"
    );

    // 3. Import the prebuilt SSR bundle from dist/server.
    const ssrModule = await import("../dist/server/entry-server.js");
    createApp = ssrModule.createApp;
  } else {
    // ---- DEVELOPMENT MODE (Vite dev server) ----
    const vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });
    app.use(vite.middlewares);

    const rawTemplate = await fs.readFile(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );
    // Vite will transform the HTML (e.g. inject modules/scripts)
    template = await vite.transformIndexHtml("/", rawTemplate);

    createApp = (await vite.ssrLoadModule("/src/entry-server.ts")).createApp;
  }

  // 4. Universal SSR route: Catch everything else and render the app.
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      // Create fresh app instance and set up router
      const { app: ssrApp, router, pinia } = createApp();
      router.push(url);
      await router.isReady();

      // Run asyncData hooks if any (optional)
      const matched = router.currentRoute.value.matched;
      await Promise.all(
        matched.map((record) => {
          const asyncData = record.components?.default?.asyncData;
          return asyncData
            ? asyncData({ pinia, route: router.currentRoute.value })
            : null;
        })
      );

      // Render Vue app to string
      const { renderToString } = await import("vue/server-renderer");
      const appHtml = await renderToString(ssrApp);

      // Serialize pinia state
      const state = serialize(pinia.state.value, { isJSON: true });

      // Inject rendered HTML and state into template
      const html = template
        .replace("<!--app-html-->", appHtml)
        .replace(
          "<!--pinia-state-->",
          `<script>window.__PINIA_STATE__ = ${state}</script>`
        );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      console.error("Error rendering %s:", req.originalUrl, err);
      res.status(500).end(err.message);
    }
  });

  // 5. Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
