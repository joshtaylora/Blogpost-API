import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthTokenStore } from './auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  token$: Observable<Token>;
  token: Token;
  constructor(private auth: AuthTokenStore, private router: Router) {
    this.token$ = this.auth.token$;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.token$.subscribe((token)=> {
      this.token = token;
    })
    if (
      this.token === null ||
      new Date(this.token!.exp * 1000) < new Date() ||
      this.token === undefined
    ) {
      // emit that the user has been logged off
      this.auth.logoutUser();
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
