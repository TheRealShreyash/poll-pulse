import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  {
    autoConnect: false,
    withCredentials: true, // sends the Iris session cookie
  },
);

export const EVENTS = {
  // client → server
  JOIN_POLL: "join_poll",
  LEAVE_POLL: "leave_poll",

  // server → client
  VOTE_UPDATE: "vote_update",
  POLL_CLOSED: "poll_closed",
} as const;

export interface JoinPollPayload {
  pollId: string;
}
export interface LeavePollPayload {
  pollId: string;
}

export interface VoteUpdatePayload {
  pollId: string;
  counts: number[]; // index matches option order
  total: number;
}

export interface PollClosedPayload {
  pollId: string;
}
