import { z } from "zod";

export const userTokenPayloadModel = z.object({
  iss: z.string(),
  sub: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  family_name: z.string(),
  given_name: z.string(),
  name: z.string(),
  picture: z.string().optional(),
});

export type UserTokenPayload = z.infer<typeof userTokenPayloadModel>;
