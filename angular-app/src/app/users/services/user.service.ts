import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '@users/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { shareReplay } from 'rxjs/operators';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() UserStateChanged = new EventEmitter<boolean>();
  userToken: Token;
  userIsLoggedIn = false;
  usersURL = `${environment.BASE_URL}/Users`;
  constructor(private httpClient: HttpClient, private auth: AuthTokenStore) {
    this.auth.token$.subscribe((token) => {
      this.userToken = token;
    });
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.usersURL}/${userId}`)
      .pipe(shareReplay());
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.usersURL}`).pipe(shareReplay());
  }

  createUser(newUser: User): Observable<unknown> {
    return this.httpClient.post<User>(`${this.usersURL}/${newUser.userId}`, {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      emailAddress: newUser.emailAddress,
      password: newUser.password,
    });
  }

  patchUser(userId: string, update: Partial<User>) {
    const authToken = localStorage.getItem('token');
    const bearerToken = JSON.parse(authToken) as { Authorization: string };
    return this.httpClient.patch<User>(
      `${this.usersURL}/${userId}`,
      {
        firstName: update?.firstName,
        lastName: update?.lastName,
        emailAddress: update?.emailAddress,
      },
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `${bearerToken.Authorization}`
        ),
      }
    );
  }

  deleteUser(userId: string) {
    const authToken = localStorage.getItem('token');
    const bearerToken = JSON.parse(authToken) as { Authorization: string };
    return this.httpClient.delete(`${this.usersURL}/${userId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `${bearerToken.Authorization}`
      ),
    });
  }
}
