import app from "./app";
import AppDataSource from "./database";
import { getConfig } from "./utils/cofig";
import { logger, logInit } from "./utils/logger";

async function run() {
  try {
    // Initialize environment
    const currentEnv = process.env.NODE_ENV || "development";
    const config = getConfig(currentEnv);

    // Activate logger
    logInit({ env: currentEnv, logLevel: config.logLevel });
    logger.info(`SCM server has started with process id ${process.pid}`);

    // Initialize PostgreSQL connection using TypeORM DataSource
    await AppDataSource.initialize();
    logger.info("PostgreSQL connected successfully!");

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
          await AppDataSource.destroy();
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

          await AppDataSource.destroy();
          logger.info("PostgreSQL disconnected!");

          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    });
  } catch (error: unknown) {
    console.log("error connection: =:",error)
    logger.error("SCM Server failed!", { error });

    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info("PostgreSQL disconnected!");
    }
    process.exit(1);
  }
}

run();
