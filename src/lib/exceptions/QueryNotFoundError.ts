import { AppError, HttpCode } from './AppError';

export default class QueryNotFoundError extends AppError {
  constructor(message: string) {
    super({
      description: message || 'No query results found.',
      httpCode: HttpCode.NOT_FOUND
    });
  }
}
