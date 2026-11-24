import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = loginService.getToken();// false o true

  // adjuntamos el token en cada request si existe
  if(token){
    req = req.clone({
      setHeaders : { Authorization: `Bearer ${token}`}
    })
  }

  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      // TOKEN EXPIRADO O INVALIDO -> CERRAR SESSION
      if(error.status === 401){
        loginService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);

    })
  );
};
