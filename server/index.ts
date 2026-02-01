import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js"; 
import { serveStatic } from "./static.js";   
import { createServer } from "http";
import serverless from "serverless-http";     
import "dotenv/config";

const app = express();
const httpServer = createServer(app);

// Use a type-safe way to handle rawBody for webhooks if needed
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Optimized logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

(async () => {
  // Register all API routes
  await registerRoutes(httpServer, app);

  // Global Error Handler
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`[Error] ${status} - ${message}`);
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  // Handle Static Files vs Vite Dev Server
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  }

  // Only start a local server if NOT running as a Serverless Function
  if (!process.env.NETLIFY && !process.env.VERCEL && !process.env.LAMBDA_TASK_ROOT) {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen({ port, host: "0.0.0.0" }, () => {
      log(`serving on port ${port}`);
    });
  }
})();

// Primary export for Netlify (Handler) and Vercel (Default)
export const handler = serverless(app);
export default app;