import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isLogged()){
    return true;
  }

  router.navigate(['/login']);


  return false;
};
