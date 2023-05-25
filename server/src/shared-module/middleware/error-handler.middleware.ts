import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ErrorHandlerMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { status } = exception;

    const messages: any = exception.response?.message;
    const errorName = exception.response?.error;

    response.status(status).send({
      code: status,
      error: errorName,
      messages,
    });
  }
}
