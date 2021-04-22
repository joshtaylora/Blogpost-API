import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@users/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { shareReplay, tap } from 'rxjs/operators';
import { Token } from 'src/app/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersURL = `${environment.BASE_URL}/Users`;
  constructor(private httpClient: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.usersURL}/${userId}`)
      .pipe(shareReplay());
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.usersURL}`).pipe(shareReplay());
  }

  createUser(newUser: {
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  }) {
    return this.httpClient.post(`${this.usersURL}/${newUser.userId}`, newUser);
  }

  loginUser(userId: string, password: string) {
    return this.httpClient
      .get<{ Authorization: string }>(`${this.usersURL}/${userId}/${password}`)
      .pipe(
        tap((token) => {
          // store the returned auth token in local storage
          localStorage.setItem('token', JSON.stringify(token));
        })
      );
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}
