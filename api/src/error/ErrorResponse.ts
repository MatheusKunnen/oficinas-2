export default class ErrorResponse extends Error {
  public static D_ERROR_CODE = '000';

  private httpCode: number;
  private errorCode: string;

  constructor(
    name: string,
    httpCode: number,
    message?: string | null,
    errorCode?: string
  ) {
    super(name);
    this.name = name;
    this.message = message ? message : name;
    this.httpCode = httpCode;
    this.errorCode = errorCode ? errorCode : ErrorResponse.D_ERROR_CODE;
  }

  public getName(): string {
    return this.name;
  }

  public getMessage(): string {
    return this.message;
  }

  public getHttpCode(): number {
    return this.httpCode;
  }

  public getErrorCode(): string {
    return this.errorCode;
  }
}
