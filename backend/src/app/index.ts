import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes";
import { FRONTEND_URL } from "../config";
import pollRouter from "./modules/poll/poll.routes";

export function createApplication() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use("/api/auth", authRouter);
  app.use("/api/poll", pollRouter);

  app.get("/health", (_, res) => {
    return res.json({ success: true, status: "Healthy" });
  });

  return app;
}
