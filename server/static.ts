import express, { type Express } from "express";
import path from "path";
import fs from "fs";

export function serveStatic(app: Express) {
  // Use process.cwd() to get the absolute root directory of your project
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`CRITICAL: Build directory not found at ${distPath}`);
  }

  app.use(express.static(distPath));

  // The Catch-All Route: Ensures React handles sub-pages like /about
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Frontend build not found.");
    }
  });
}
