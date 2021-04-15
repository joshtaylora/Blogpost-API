import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private userSvc: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let userInfo = this.userSvc.getLoggedInUser();
    console.log(userInfo);
    if (
      userInfo === null ||
      new Date(userInfo!.exp * 1000) < new Date() ||
      userInfo === undefined
    ) {
      // emit that the user has been logged off
      this.userSvc.SetUserAsLoggedOff();
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
