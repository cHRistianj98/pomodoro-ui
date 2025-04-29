import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = req.url;
    if (
      url.endsWith('/api/v1/auth/login') ||
      url.endsWith('/api/v1/auth/register')
    ) {
      return next.handle(req);
    }

    const token = this.auth.token;
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[AuthInterceptor] HTTP error status:', error.status, error.url);
        if (error.status === 401 || error.status === 403) {
          // Clean up token
          this.auth.logout();
          console.log('[AuthInterceptor] redirecting to /login');
          Promise.resolve().then(() => {
            this.router.navigateByUrl('/login');
          });
          return EMPTY;
        }
        return throwError(() => error);
      })
    );
  }
}
