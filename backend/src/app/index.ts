import express from "express";
import authRouter from "./modules/auth/auth.routes";

export function createApplication() {
  const app = express();

  app.use(express.json());
  app.use("/api/auth", authRouter);

  app.get("/health", (_, res) => {
    return res.json({ success: true, status: "Healthy" });
  });

  return app;
}
