import { Server } from "../models/server";
import serverless from "serverless-http";

const server = new Server();

// Conectar DB al inicio de cada request si no estamos en desarrollo local
if (process.env.NODE_ENV === "production") {
  server.initDB();
} else {
  // Solo para desarrollo local
  server.initDB().then(() => {
    server.app.listen(process.env.PORT || 3000, () =>
      console.log("Server corriendo en desarrollo")
    );
  });
}

// Exportamos para Vercel
export default serverless(server.app);