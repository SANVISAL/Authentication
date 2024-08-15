import { StatusCode } from "./consts";
import { HttpException } from "./http-exception";

export class ApiError extends HttpException {
  public constructor(
    message: string = "Unexpected error accurred.",
    statusCode: number = StatusCode.InternalServerError
  ) {
    super(message, statusCode);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
