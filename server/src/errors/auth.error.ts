import { APIError } from './apiError.error';

export class AuthError extends APIError {
  constructor(public message: string, details?: any) {
    super(message, details);
  }
}
