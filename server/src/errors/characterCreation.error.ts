import { APIError } from './apiError.error';

export class CharacterCreationError extends APIError {
  constructor(public message: string, details?: any) {
    super(message, details);
  }
}
