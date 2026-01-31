import express, { type Express } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Standard way to get __dirname in ES Modules (required for Vercel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  // In your build, the client files are moved to dist/public
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    // This error will show in Vercel Logs if the build fails
    console.error(`Build directory not found at: ${distPath}`);
  }

  // Serve static files (js, css, images)
  app.use(express.static(distPath));

  // Fix: Use the standard Express '*' wildcard to serve index.html for all frontend routes
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"), (err) => {
      if (err) {
        res.status(500).send("Error loading portfolio. Check server logs.");
      }
    });
  });
}
