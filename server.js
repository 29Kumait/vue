import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import devalue from "devalue"; // safely serialize JS objects to strings
import rateLimit from "express-rate-limit";
import he from "he";
import compression from "compression";
import helmet from "helmet";
import type { Express, Request, Response, NextFunction } from "express";
import type { ViteDevServer } from "vite";
import type { RateLimitRequestHandler } from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app: Express = express();

  // set up rate limiter: maximum of 100 requests per 15 minutes
  const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
  });

  // apply rate limiter to all requests
  app.use(limiter);

  // apply compression middleware
  app.use(compression());

  // apply security middleware
  app.use(helmet());

  // 1) Create Vite in middleware mode
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: "ssr" },
    appType: "custom", // avoid Vite spamming console with warnings
  });

  // 2) Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // 3) Handle all routes
  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl;

      // 3.1) Load server entry (createApp) from Vite
      const { createApp } = await vite.ssrLoadModule("/src/entry-server.ts");
      const { app: ssrApp, router, pinia } = createApp();

      // 3.2) Push the current route
      router.push(url);
      await router.isReady();

      // 3.3) Render the app's HTML
      const { renderToString } = await import("@vue/server-renderer");
      const appHtml = await renderToString(ssrApp);

      // 3.4) Grab the state from Pinia
      // This is your "initial state" to hydrate on client
      const piniaState = pinia.state.value;
      const serializedState = devalue(piniaState);
      // safer than JSON.stringify

      // 3.5) Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 3.6) Transform the HTML with Vite (injects <script type="module">, etc.)
      template = await vite.transformIndexHtml(url, template);

      // 3.7) Inject SSR app HTML
      // Also inject the pinia state somewhere (e.g., as a <script> tag)
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(
          `<!--pinia-state-->`,
          `<script>window.__PINIA = ${serializedState}</script>`
        );

      // 3.8) Send the rendered HTML
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      res.status(500).end(he.escape((err as Error).message));
    }
  });

  // apply cache-control header to static assets
  app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // 4) Start server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
