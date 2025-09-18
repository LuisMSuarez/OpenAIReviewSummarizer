// start.ts
import { serve } from "bun";
import express from "express";
import dotenv from "dotenv";
import router from "./packages/server/routes"; // adjust path if needed
import path from "path";
import { readFile } from "fs/promises";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", router); // mount your API routes in the root

const clientDist = path.resolve(import.meta.dir, "packages/client/dist");

// Serve static files
app.use(express.static(clientDist));

// Spa fallback with named fallback
app.get("/*splat", async (_, res) => {
  const indexPath = path.join(clientDist, "index.html");
  const html = await readFile(indexPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Unified app running at http://localhost:${port}`);
});
