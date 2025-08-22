import { Server } from "../models/server";
import serverless from "serverless-http";

const server = new Server();

// Solo para desarrollo local
if (process.env.NODE_ENV !== "production") {
  server.start();
}

// Exportamos para Vercel
export default serverless(server.app);
