import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  // create a BehaviorSubject that Observers will be able to
  // subscribe to and initialize it to null so that unauthorized
  // access is prohibited
  private subject = new BehaviorSubject<Token>(null);

  usersURL = `${environment.BASE_URL}/users`;

  token$: Observable<Token> = this.subject.asObservable();

  loggedIn$: Observable<boolean>;
  loggedOut$: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    /*
     * loggedIn$
     * Type: Observable<boolean>
     * Description: When a user logs in, this Observables will
     * take as input the token Observable create a mapping that will
     * make the loggedIn$ Observable emit a boolean equivalent to the
     * truthy/falsy representation of the Token
     */

    this.loggedIn$ = this.token$.pipe(map((token) => !!token));

    this.loggedOut$ = this.loggedIn$.pipe(map((loggedIn) => !loggedIn));
    // retrieve the token from LocalStorage
    const token = localStorage.getItem('token');

    if (token) {
      // parse the token string we received from LocalStorage as a JSON object
      // where { Authorization: json web token }
      const tokenJSON = JSON.parse(token) as { Authorization: string };
      // decode the jwt and parse it as a Token object
      const tokenObj = jwt_decode(tokenJSON.Authorization) as Token;
      // push the Token to the Observers that are subscribed
      this.subject.next(tokenObj);
    }
  }

  /**
   * @param userId The userId for the User that is attempting to
   *               log in.
   * @param password The password for the User that is attempting
   *                 to log in.
   * @return An Observable of type Token
   */
  login(userId: string, password: string): Observable<Token> {
    return this.httpClient
      .get<Token>(`${this.usersURL}/${userId}/${password}`)
      .pipe(
        tap((token) => {
          // tap takes in the token Observable
          //
          // const tokenStr = JSON.parse(JSON.stringify(token)) as {
          //   Authorization: string;
          // };
          this.subject.next(token);
          localStorage.setItem('token', JSON.stringify(token));
        }),
        shareReplay()
      );
  }

  logout(): void {
    this.subject.next(null);
    localStorage.removeItem('token');
  }
}
