import { HttpException } from "./http-exception";

export class ApiError extends HttpException {
  public constructor(
    message: string = "Unexpected erorr accurred.",
    statusCode: number
  ) {
    super(message, statusCode);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
