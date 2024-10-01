import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const isList = response.req.url.includes('list');
    response.status(status).json({
      error_code: isList ? 'INVALID_TYPE' : 'INVALID_DATA',
      error_description: isList
        ? exceptionResponse.error_description
        : exceptionResponse.message,
    });
  }
}
