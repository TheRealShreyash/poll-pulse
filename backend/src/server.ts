import http from "node:http";
import "dotenv/config";
import { createApplication } from "./app";
import { setupSocketServer } from "./socket";

async function main() {
  try {
    const server = http.createServer(createApplication());
    const io = setupSocketServer(server);

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => {
      console.log(`[HTTP] Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error starting the server: `, error);
    process.exit(1);
  }
}

main();
