import { ValidationError } from 'joi';

import { AppError, HttpCode } from './AppError';

export default class ValidationSchemaError extends AppError {
  constructor(error: ValidationError) {
    const errors = error.details.map(({ message, path }) => ({
      path: path.join(),
      message: message.replace(/['"]/g, '')
    }));

    const errorsByKey = errors.reduce((objectsByKeyValue, obj) => {
      return {
        ...objectsByKeyValue,
        [obj.path]: ((objectsByKeyValue as any)[obj.path] || []).concat(
          obj.message
        )
      };
    }, {});

    super({
      description:
        JSON.stringify(errorsByKey) || 'Error validating properties.',
      httpCode: HttpCode.BAD_REQUEST
    });
  }
}
