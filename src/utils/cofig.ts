import path from "path";
import dotenv from "dotenv";
import { logger } from "./logger";

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = [
    "NODE_ENV",
    "PORT",
    "LOG_LEVEL",
    "DB_PORT",
    "USERNAME",
    "PASSWORD",
    "TYPE",
    "DATABASE_NAME",
    "HOST",
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    logger.info(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    dbport: process.env.DB_PORT,
    type: process.env.TYPE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
  };
}

export function getConfig(currentEnv: string = "development") {
  const configPath = path.join(
    __dirname,
    currentEnv === "development"
      ? "../../configs/.env"
      : currentEnv === "staging"
      ? "../../configs/.env.staging"
      : currentEnv === "production"
      ? "../../configs/.env.production"
      : "../../configs/.env.test"
  );
  return createConfig(configPath);
}
