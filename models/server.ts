import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authPieceRouter from "../routes/authPiece";
import authCombinedRouter from "../routes/authCombinedPieces";
import { connectBD } from "../dataBase/DBConfig";

dotenv.config();

export class Server {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/authPiece", authPieceRouter);
    this.app.use("/authCombinedPieces", authCombinedRouter);
  }

  // Función para inicializar DB en modo serverless
  public async initDB(): Promise<void> {
    try {
      await connectBD();
      console.log("DB conectada");
    } catch (error) {
      console.error("Error conectando a la DB:", error);
    }
  }
}
