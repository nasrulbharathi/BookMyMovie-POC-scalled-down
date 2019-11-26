import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoggerService } from '../services/logger.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

    constructor(private logService: LoggerService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpResponse ) {
          if (error.status === 401) {
            // Handling Unauthroied error
          } else if (error.status === 0) {
              // alert('Run the JsonServer');
          } else if (error.status === 429) {
            // handle error
          } else {
            this.logService.error('HTTP Errors', [error.message, error.status, error.statusText ]);
            return throwError(error);
          }
        }
      })
    );
  }
}
