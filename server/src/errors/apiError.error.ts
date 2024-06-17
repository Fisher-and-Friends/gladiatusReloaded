export class APIError extends Error {
  public details = {};
  constructor(public message: string, details: any = {}) {
    super(message);
    this.details = details;
  }
}
