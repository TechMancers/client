import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = req;
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('accessToken');
            //console.log('authreq', authReq, 'token', token);
            if (token) {
                authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('admin_id');
                    }
                    this.router.navigate(['/']);
                }
                return throwError(error);
            })
        );
    }
}
