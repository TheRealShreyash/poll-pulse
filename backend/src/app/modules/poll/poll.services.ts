import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import {
  optionsTable,
  pollsTable,
  usersTable,
  votesTable,
} from "../../../db/schema";
import { ApiError } from "../../common/utils";
import type { CreatePollPayload } from "./poll.models";

export const createPoll = async (
  payload: CreatePollPayload,
  creatorId: string,
) => {
  const {
    title,
    description,
    isAnonymous,
    expiresAt,
    options,
    status,
    showLiveResults,
  } = payload;

  const [creator] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, creatorId))
    .limit(1);

  if (!creator) throw ApiError.badRequest("User does not exist!");

  const [poll] = await db
    .insert(pollsTable)
    .values({
      creatorId,
      title,
      description,
      status,
      isAnonymous,
      showLiveResults,
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

export const getPoll = async (pollId: string, creatorId: string) => {
  if (!pollId) throw ApiError.badRequest("No poll id provided");

  const [poll] = await db
    .select()
    .from(pollsTable)
    .where(eq(pollsTable.id, pollId))
    .limit(1);

  if (!poll) throw ApiError.badRequest("Invalid poll id");

  if (poll.creatorId !== creatorId) throw ApiError.forbidden("Access Denied");

  const options = await db
    .select()
    .from(optionsTable)
    .where(eq(optionsTable.pollId, poll.id))
    .orderBy(asc(optionsTable.displayOrder));

  const voteResult = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(votesTable)
    .where(eq(votesTable.pollId, poll.id));

  const totalResponses = voteResult[0]?.count ?? 0;

  return { ...poll, options, totalResponses };
};
