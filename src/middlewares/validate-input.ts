import { Response, Request, NextFunction } from "express";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { Schema, ZodError } from "zod";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { ApiError } from "@CRUD_PG/utils/api-error";
import { logger } from "@CRUD_PG/utils/logger";

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
