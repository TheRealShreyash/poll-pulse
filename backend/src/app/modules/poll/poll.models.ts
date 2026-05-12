import { z } from "zod";

export const createPollPayloadModel = z.object({
  title: z.string(),
  description: z.string(),
  options: z.array(z.string().min(1).max(120)).min(2).max(4),
  isAnonymous: z.boolean().default(false),
  expiresAt: z.iso.datetime().optional().nullable(),
});

export type CreatePollPayload = z.infer<typeof createPollPayloadModel>;
