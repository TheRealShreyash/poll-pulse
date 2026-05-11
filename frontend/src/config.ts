import { z } from "zod";

const envSchema = z.object({
  VITE_IRIS_AUTH_URL: z.url(),
  VITE_CLIENT_ID: z.string().min(1),
  VITE_BACKEND_URL: z.url(),
  VITE_NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.parse(import.meta.env);

export const IRIS_AUTH_URL = env.VITE_IRIS_AUTH_URL;
export const CLIENT_ID = env.VITE_CLIENT_ID;
export const BACKEND_URL = env.VITE_BACKEND_URL;
export const NODE_ENV = env.VITE_NODE_ENV;
