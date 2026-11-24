import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const notGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLogged()){
    router.navigate(['/dashboard']);
    return false;
  }


  return true;
};
