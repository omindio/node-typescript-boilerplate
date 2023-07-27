import { AppError, HttpCode } from './AppError';

export default class MissingParameterError extends AppError {
  constructor(params: string[]) {
    super({
      description: `Missing Parameters: ${params.join()}`,
      httpCode: HttpCode.BAD_REQUEST
    });
  }
}
