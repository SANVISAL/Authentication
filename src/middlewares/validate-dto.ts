import { ApiError } from "@AUTH/utils/api-error";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { validateOrReject, ValidationError } from "class-validator";
import { NextFunction } from "express";

export const validateDTO = (dtoClass: any) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const dto = Object.assign(new dtoClass(), req.body);

    try {
      await validateOrReject(dto);
      next();
    } catch (error: unknown) {
      if (Array.isArray(error)) {
        // Format and send validation error messages
        const errorMessages = formatValidationErrors(
          error as ValidationError[]
        );
        next(
          new HttpException(`${errorMessages}`, StatusCode.UnprocessableEntity)
        );
      } else {
        next(new ApiError());
      }
    }
  };
};
