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
      console.log("User from Auth Guard:", user);

      if (!user) {
        console.log("User is null, redirecting to login");
        return router.createUrlTree(['/login']);
      }

      const allowedRoles = route.data['role'] as string[];
      console.log("Allowed Roles:", allowedRoles);

      if (user.role && allowedRoles.includes(user.role)) {
        console.log("User has valid role, allowing access");
        return true;
      }

      console.log("User does not have the required role, redirecting to forbidden");
      return router.createUrlTree(['/forbidden']);
    })
  );
};
