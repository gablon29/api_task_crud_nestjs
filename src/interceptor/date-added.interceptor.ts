import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class DateAddedInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const request = context.switchToHttp().getRequest<Request>();
    (request as Request & { now: string }).now = formattedDate;
    return next.handle();
  }
}
