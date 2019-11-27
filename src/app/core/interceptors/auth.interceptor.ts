import { HttpInterceptor, HttpHandler, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authDetails: any = JSON.parse(sessionStorage.getItem('authDetails'));
        if (authDetails) {
            const data = req.clone({
                headers: req.headers.set('Authorization', 'Google ' + authDetails.token)
            });
            return next.handle(data);
        } else {
            return next.handle(req);
        }
    }

}
