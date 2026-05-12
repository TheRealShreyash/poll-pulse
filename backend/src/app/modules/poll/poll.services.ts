import { db } from "../../../db";
import { optionsTable, pollsTable } from "../../../db/schema";
import { ApiError } from "../../common/utils";
import type { CreatePollPayload } from "./poll.models";

export const createPoll = async (
  payload: CreatePollPayload,
  creatorId: string,
) => {
  const { title, description, isAnonymous, expiresAt, options } = payload;
  const [poll] = await db
    .insert(pollsTable)
    .values({
      creatorId,
      title,
      description,
      isAnonymous,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    })
    .returning();

  if (!poll) throw ApiError.internalError("Internal server error");

  await db.insert(optionsTable).values(
    options.map((text, i) => ({
      pollId: poll.id,
      text,
      displayOrder: i + 1,
    })),
  );

  return poll;
};
