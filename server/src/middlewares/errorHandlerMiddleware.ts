import { Request, Response, NextFunction, response } from 'express';
import { HttpException } from '@src/utils/exceptions';

const ErrorHandlerMiddleware = (error: HttpException, request: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status);
    response.send({
        status,
        message,
    });
};

export default ErrorHandlerMiddleware;
