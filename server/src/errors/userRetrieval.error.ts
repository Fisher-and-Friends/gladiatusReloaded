import { APIError } from './apiError.error';

export class UserRetrievalError extends APIError {
  constructor(public message: string, details?: any) {
    super(message, details);
  }
}
