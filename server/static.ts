import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // Standard Vercel path for built assets
  const distPath = path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
