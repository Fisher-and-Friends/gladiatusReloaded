import { APIError } from './apiError.error';

export class UserCreationError extends APIError {
  constructor(public message: string, details?: any) {
    super(message, details);
  }
}
