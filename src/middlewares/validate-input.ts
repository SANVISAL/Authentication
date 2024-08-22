import { ApiError } from "@AUTH/utils/api-error";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { Response, Request, NextFunction } from "express";
import { Schema, ZodError } from "zod";

export const inputValidator = (schema: Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => {
          return `${issue.path.join(".")} ${issue.message}`;
        });
        return next(
          new HttpException(`${errorMessages}`, StatusCode.UnprocessableEntity)
        );
      }
      logger.error("Error in zodValidator middleware:", error);
      return next(new ApiError());
    }
  };
};
