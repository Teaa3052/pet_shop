import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const roleGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUserValue;

  if (user?.role == 'superuser') {
    return true;
  }

  router.navigate(['/dashboard']);
  return false; 

};
