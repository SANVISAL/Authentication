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
    "DB_USERNAME",
    "DB_PASSWORD",
    "TYPE",
    "DATABASE_NAME",
    "HOST",
    "DB_LOG",
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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    dbLog: process.env.DB_LOG,
  };
}

export function getConfig(currentEnv: string = "development") {
  const configPath = path.join(
    __dirname,
    currentEnv === "development"
      ? "../../configs/.env"
      : currentEnv === "uat"
      ? "../../configs/.env.uat"
      : currentEnv === "production"
      ? "../../configs/.env.production"
      : "../../configs/.env.test"
  );
  return createConfig(configPath);
}
