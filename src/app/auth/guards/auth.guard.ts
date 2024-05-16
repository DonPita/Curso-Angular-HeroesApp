import {
  ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,
  CanMatchFn, Route, UrlSegment
} from '@angular/router';

/*No hay necesidad de crear una clase, simplemente definiendo una
función flecha y exportándola podemos utilizar sus funcionalidades de guard
en el app-routing*/
export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state});

  return false;
}


export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments});

  return false;
}
