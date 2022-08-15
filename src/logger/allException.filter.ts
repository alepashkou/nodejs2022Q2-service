import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  Logger,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger();
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();
    let { message } = exception;
    if (exception instanceof HttpException) {
      this.logger.error(`${req.method} ${req.url}`, exception.message);
      status === 500 ? (message = 'Server Error') : message;
    }
    res.status(status).json({
      statusCode: status,
      url: req.url,
      message,
    });
  }
}
