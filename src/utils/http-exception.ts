export class HttpException extends Error {
  private readonly _statusCode: number;

  public constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
    this.name = this.constructor.name;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public serializeError() {
    return {
      statusCode: this._statusCode,
      message: this.message,
      name: this.name,
    };
  }

  public getStatusCode(): number {
    return this._statusCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getName(): string {
    return this.name;
  }
}
