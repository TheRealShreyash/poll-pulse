import { Server } from "socket.io";

export function setupSocketServer(server: any) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`[Socket] connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[Socket] disconnected`);
    });
  });

  return io;
}
