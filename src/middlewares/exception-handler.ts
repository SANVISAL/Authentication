import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { ErrorResponse } from "@AUTH/utils/response";
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
