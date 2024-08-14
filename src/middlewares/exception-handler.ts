import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { ErrorResponse } from "@CRUD_PG/utils/response";
import { NextFunction, Request, Response } from "express";

export const exceptionHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpException) {
    const statusCode = error.getStatusCode();

    return res
      .status(statusCode)
      .json(new ErrorResponse(`${statusCode}`, error.message));
  } else {
    // unhandle error
    return res
      .status(StatusCode.InternalServerError)
      .json(
        new ErrorResponse(
          `${StatusCode.InternalServerError}`,
          "Internal Server Error."
        )
      );
  }
};
