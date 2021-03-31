import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  private canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const logInStatus = localStorage.getItem('userIsLoggedIn');
    let userLoggedIn: boolean;
    if (logInStatus != null) {
      userLoggedIn = JSON.parse(logInStatus);
    } else {
      userLoggedIn = false;
    }

    if (!userLoggedIn) {
      this.router.navigate(['login']);
    }
    return userLoggedIn;
  }
}
