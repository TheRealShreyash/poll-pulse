import express from "express";

export function createApplication() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_, res) => {
    return res.json({ success: true, status: "Healthy" });
  });

  return app;
}
