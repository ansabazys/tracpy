import express, { Request, Response, NextFunction } from "express";
import { env } from "@repo/config";
import PinoHttp from "pino-http";
import { logger } from "./utils/logger";

const app = express();

app.use(PinoHttp({ logger }));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "ingestion-service" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

app.listen(env.PORT, () => {
  logger.info(`Ingestion running on port ${env.PORT}`);
});
