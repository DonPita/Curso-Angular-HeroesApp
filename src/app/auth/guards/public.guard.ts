import {
  ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,
  CanMatchFn, Route, UrlSegment,
  Router
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';


export const checkPublicStatus = (): boolean | Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isauthenticated) => {
        console.log('Authenticated: ', isauthenticated)
      }),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      //Hay qwe meterle el mapa, para cambiarle el valor y que te deje volver al login
      map(isAuthenticated => !isAuthenticated)
    )
}

export const canPublicActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  return checkPublicStatus();
}


export const canPublicMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkPublicStatus();
}
