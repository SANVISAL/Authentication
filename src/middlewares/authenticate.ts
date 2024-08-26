import { getConfig } from "@AUTH/utils/cofig";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { NextFunction, Request, Response } from "express";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const config = getConfig();
  try {
    // Safely extract headers and check their types
    const apiKey = req.headers["x-api-key"];
    const apiSecret = req.headers["x-api-secret"];

    if (typeof apiKey !== "string" || apiKey !== config.apiKey) {
      logger.error(`Invalid API key: ${apiKey}`);
      throw new HttpException("Invalid api key", StatusCode.Unauthorized);
    }

    if (typeof apiSecret !== "string" || apiSecret !== config.apiSecret) {
      logger.error(`Invalid API secret: ${apiSecret}`);
      throw new HttpException("Invalid api secret", StatusCode.Unauthorized);
    }

    next();
  } catch (error: unknown) {
    logger.error(`An error occured while authenticate API keys ${error}`);
    next(error);
  }
};
