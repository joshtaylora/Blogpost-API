import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { Observable, pipe } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable()
export class CanLoadAuthGuard implements CanLoad {
  // ensures that none of the private child elements that relate
  // to routes that require user authentication is necessary to
  // access will be able to be accessed by unauthorized entities
  constructor(private auth: AuthStore, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.loggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
