import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express'
import { ExtractException } from '../exceptions/extract-exception';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  
  logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    
    this.logger.error(`Exception has been occur with ${status}`)

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.getResponse(),
        path: request.url,
        stack: exception.stack
      })
  }
}