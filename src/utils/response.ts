import { ApiResponse } from "./@types/response.type";

export class SuccessResponse<T> implements ApiResponse<T> {
  code: string | "";
  message: string;
  result: T;

  public constructor(code: string | "", message: string, result: T) {
    this.code = code;
    this.message = message;
    this.result = result;
  }

  public serializeSuccess(): ApiResponse<T> {
    return {
      code: this.code,
      message: this.message,
      result: this.result,
    };
  }
}

export class ErrorResponse implements ApiResponse<null> {
  code: string | "";
  message: string;
  result: null;

  public constructor(code: string | "", message: string) {
    this.code = code;
    this.message = message;
    this.result = null;
  }

  public serializeError(): ApiResponse<null> {
    return {
      code: this.code,
      message: this.message,
      result: this.result,
    };
  }
}
