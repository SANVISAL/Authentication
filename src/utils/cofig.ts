import path from "path";
import dotenv from "dotenv";
import { HttpException } from "./http-exception";
import { StatusCode } from "./consts";

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = ["NODE_ENV", "PORT", "LOG_LEVEL"];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new HttpException(
      `Missing required environment variables: ${missingConfig.join(", ")}`,
      StatusCode.InternalServerError
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
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
