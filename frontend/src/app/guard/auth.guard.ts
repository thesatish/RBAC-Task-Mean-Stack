import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.AuthenticatedUser$.pipe(
    take(1),
    map(user => {
      const allowedRoles = route.data['roles'] as string[];

      if (user && user.role && allowedRoles.includes(user.role)) {
        return true;
      }

      if (user) {
        return router.createUrlTree(['/forbidden']);
      }

      return router.createUrlTree(['/login']);
    })
  );
};
