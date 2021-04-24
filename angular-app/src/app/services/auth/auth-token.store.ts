import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from 'src/app/models/token.model';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStore {
  private subject = new BehaviorSubject<Token>(null);
  token$: Observable<Token> = this.subject.asObservable();

  userLoggedIn$: Observable<boolean>;
  userLoggedOut$: Observable<boolean>;

  usersURL = `${environment.BASE_URL}/Users`;

  constructor(private httpClient: HttpClient) {
    // pipe the value emitted by the token$ Observable to the userLoggedIn$
    // Observable and map the value emitted to be typecast as a boolean.
    // If the last value emitted was null, the boolean will be false. If
    // the last value emitted was not null, undefined, or some other falsy
    // value, this Observable will emit 'true'
    this.userLoggedIn$ = this.token$.pipe(map((token) => !!token));

    // pipe the result emitted by the userLoggedIn$ Observable and map
    // the boolean received so that the output of the userLoggedOut$
    // Observable is the opposite of that
    this.userLoggedOut$ = this.userLoggedIn$.pipe(
      map((userLoggedIn) => !userLoggedIn)
    );

    // grab a token from local storage if it exists
    const tokenStr = localStorage.getItem('token');

    if (tokenStr) {
      // parse the auth token stored as a string to be of the type
      // { Authorization: string }
      const tokenJSON = JSON.parse(tokenStr) as { Authorization: string };
      // decode the parsed token into the Token type
      const tokenObj = jwt_decode(tokenJSON.Authorization) as Token;
      // emit the Token object to subscribers
      this.subject.next(tokenObj);
    }
  }

  /**
   * Makes a call to the login route of the back-end api and stores a token in local storage
   * @return Observable<Token> that will be subscribed to in the login component so that
   *         we can pass the authorization token and authenticate the use
   */
  loginUser(userId: string, password: string): Observable<Token> {
    return this.httpClient
      .get<{ Authorization: string }>(`${this.usersURL}/${userId}/${password}`)
      .pipe(
        tap((token) => {
          // store the returned auth token in local storage
          localStorage.setItem('token', JSON.stringify(token));
        }),
        map((tokenStr: { Authorization: string }) => {
          // decode the token received in the response
          const tokenObj = jwt_decode(JSON.stringify(tokenStr)) as Token;
          // emit the Token object to subscribers
          this.subject.next(tokenObj);
          return tokenObj;
        }, shareReplay())
      );
  }

  logoutUser(): void {
    this.subject.next(null);
    localStorage.removeItem('token');
  }
}
