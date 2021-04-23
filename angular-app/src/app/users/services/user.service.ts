import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '@users/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() UserStateChanged = new EventEmitter<boolean>();

  userIsLoggedIn = false;
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
  }): Observable<unknown> {
    return this.httpClient.post(`${this.usersURL}/${newUser.userId}`, newUser);
  }
}
