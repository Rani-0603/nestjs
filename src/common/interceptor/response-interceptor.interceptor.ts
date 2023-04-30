import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        let statusCode = context.switchToHttp().getResponse().statusCode;
        let response = next.handle().pipe(map(data => {
            return {
                data,
                statusCode,
                time: Date(),
                errorMessage: null
            }
        }));
        return response;
    }

}