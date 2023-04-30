import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HttpException  filter class
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * Catch block
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('inside filter')
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                data: null,
                errorMessage: exception?.message
                // timestamp: new Date().toISOString(),
                // path: request.url,
            });
    }
}