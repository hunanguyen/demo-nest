import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { MESSAGE } from '../constants';
const { RESPONSE_MESSAGE_KEY, RESPONSE_NOT_FOUND_KEY } =
  MESSAGE.RESPONSE_INTERCEPTOR;
export interface Response<T> {
  data?: T;
}
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE_KEY, message);
export const ResponseNotFound = (message: string) =>
  SetMetadata(RESPONSE_NOT_FOUND_KEY, message);

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      MESSAGE.SUCCESS;

    const responseNotFound =
      this.reflector.get<string>(
        RESPONSE_NOT_FOUND_KEY,
        context.getHandler(),
      ) ?? MESSAGE.DATA_NOT_FOUND;

    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message: responseNotFound,
            data: {},
          };
        }
        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: responseMessage,
        };
      }),
    );
  }
}
