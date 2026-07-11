export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: string[];

  constructor(message: string, statusCode: number, code: string, details?: string[]) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}
