import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService , private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    // return next.handle(authReq); Pahle Ye Then validate karna ka liys Pipe use kiya hain
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Token expired or unauthorized
          this.token.signOut(); // Optional: clear token from storage
          this.router.navigate(['/login']); // Redirect to login
        }
        return throwError(() => err);
      })
    );
    
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
