import { inject, Service } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { json } from 'stream/consumers';

@Service()
export class LoginService {
  private readonly TOKEN_KEY = 'login_token';
  private readonly USER_KEY = 'login_user';

  private BASE_URL = environment.apiUrl;

  private http = inject(HttpClient);
  private router = inject(Router);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, request).pipe(
      tap((resultado) => {
        if (resultado.exito) {
          localStorage.setItem(this.TOKEN_KEY, resultado.data.token);
          localStorage.setItem(
            this.USER_KEY,
            JSON.stringify({
              username: resultado.data.username,
              nombre: resultado.data.nombre,
              roles: resultado.data.roles,
            }),
          );
        }
      }),
    );
  }

  logout():void{
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }
}
