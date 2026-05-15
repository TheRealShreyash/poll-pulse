import { Server } from "socket.io";
import { FRONTEND_URL } from "../config";

export function setupSocketServer(server: any) {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`[Socket] connected: ${socket.id}`);

    socket.on("client:poll:join", ({ pollId }: { pollId: string }) => {
      socket.join(pollId);
    });

    socket.on("client:poll:leave", ({ pollId }: { pollId: string }) => {
      socket.leave(pollId);
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] disconnected`);
    });
  });

  return io;
}
