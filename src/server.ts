import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database/data-source";
import { getConfig } from "./utils/cofig";
import { logger, logInit } from "./utils/logger";
import { Container } from "typeorm-typedi-extensions";
import { useContainer as ormUseContainer } from "typeorm";
import fs from "fs";
import path from "path";

export const privateKey = fs.readFileSync(
  path.join(__dirname, "../privateKey.pem")
);
// Tell TypeORM to use TypeDI container
ormUseContainer(Container);
async function run() {
  try {
    // Initialize environment
    const currentEnv = process.env.NODE_ENV || "development";
    const config = getConfig(currentEnv);

    // Activate logger
    logInit({ env: currentEnv, logLevel: config.logLevel });
    logger.info(`SCM server has started with process id ${process.pid}`);

    // Initialize PostgreSQL connection using TypeORM DataSource
    const appDataSource = AppDataSource.getInstance();
    await appDataSource.initialize();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });

    // Exit handler to gracefully shut down the server
    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info("Server closed!");
          //disconnecting from a database
          await appDataSource.destroy();
          logger.info("Postgres disconnected!");

          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    // Error handler for unexpected errors
    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    // Global error handling
    process.on("uncaughtException", unexpectedErrorHandler); // Synchronouse
    process.on("unhandledRejection", unexpectedErrorHandler); // Asynchronouse

    // Handle SIGTERM signal for graceful shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        // Stop the server from accepting new requests but keep existing connections open until all ongoing requests are done
        server.close(async () => {
          logger.info("Server closed due to SIGTERM");

          await appDataSource.destroy();
          logger.info("PostgreSQL disconnected!");

          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    });
  } catch (error: unknown) {
    console.log("error connection: =:", error);
    logger.error("SCM Server failed!", { error });
    process.exit(1);
  }
}

run();
