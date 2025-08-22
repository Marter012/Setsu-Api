import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectBD } from "../database/DBConfig";

import authPieceRouter from "../routes/authPiece";
import authCombinedRouter from "../routes/authCombinedPieces";

dotenv.config();

export class Server {
  public app: Express;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    // this.app.get("/ping", (req, res) => {
    //   res.status(200).json({ msg: "pong" });
    // });

    this.app.use("/authPiece", authPieceRouter);
    this.app.use("/authCombinedPieces", authCombinedRouter);
  }

  // Método para iniciar la app, asegurando que DB esté conectada
  public async start(): Promise<void> {
    try {
      await connectBD();

      if (process.env.NODE_ENV !== "production") {
        this.app.listen(this.port, () =>
          console.log(`Server running on port ${this.port}`)
        );
      }
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  }
}

