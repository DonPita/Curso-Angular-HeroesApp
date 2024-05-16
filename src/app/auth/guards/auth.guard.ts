import {
  ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,
  CanMatchFn, Route, UrlSegment,
  Router
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';

/*No hay necesidad de crear una clase, simplemente definiendo una
función flecha y exportándola podemos utilizar sus funcionalidades de guard
en el app-routing*/

const checkAuthStatus = (): Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isauthenticated) => {
        console.log('Authenticated: ', isauthenticated)
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    )
}


export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  return checkAuthStatus();
}


export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  return checkAuthStatus();
}
