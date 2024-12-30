import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class DateAddedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<NextFunction>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const request = context.switchToHttp().getRequest();
    request.now = formattedDate;
    return next.handle();
  }
}
