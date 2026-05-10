// src/lib/socket.ts
// Single Socket.IO client instance shared across the app.
// Import `socket` wherever you need to emit or listen.
// Replace the URL with your env variable / config.

import { io } from 'socket.io-client'

export const socket = io(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  {
    // Don't auto-connect — we connect manually when joining a poll room
    autoConnect: false,
    withCredentials: true, // sends the Iris session cookie
  },
)

// ── typed event helpers ───────────────────────────────────────────────────────
// Keep event names in one place so client + server stay in sync.

export const EVENTS = {
  // client → server
  JOIN_POLL: 'join_poll',
  LEAVE_POLL: 'leave_poll',

  // server → client
  VOTE_UPDATE: 'vote_update',
  POLL_CLOSED: 'poll_closed',
} as const

// ── payload types (mirror your server-side types) ─────────────────────────────

export interface JoinPollPayload {
  pollId: string
}
export interface LeavePollPayload {
  pollId: string
}

export interface VoteUpdatePayload {
  pollId: string
  counts: number[] // index matches option order
  total: number
}

export interface PollClosedPayload {
  pollId: string
}
