import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import jwt_decode from 'jwt-decode';
// dev imports
import { environment } from 'src/environments/environment';
import { PostService } from './post.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() UserStateChanged = new EventEmitter<boolean>();
  private defaultUser = new User(
    'default',
    'default',
    'default',
    'default',
    'default'
  );
  private userSource = new BehaviorSubject(this.defaultUser);

  userIsLoggedIn: boolean = false;
  userId = 'admin';
  password = 'JoshTaylor';
  //users = USERS;

  constructor(private httpC: HttpClient) {}

  Login(userId: string, password: string) {
    // CORS implementation in express app
    return this.httpC.get<{ Authorization: string }>(
      `${environment.BASE_URL}/users/${userId}/${password}`
    );
  }

  CreateUser(userData: {
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  }) {
    console.log(userData);
    return this.httpC.post<{
      userId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      password: string;
    }>(`${environment.BASE_URL}/users`, userData);
  }

  SetUserLoggedIn(userToken: { Authorization: string }): void {
    localStorage.setItem('token', JSON.stringify(userToken));
    this.UserStateChanged.emit(true);
  }

  SetUserAsLoggedOff(): void {
    localStorage.removeItem('token');
    this.UserStateChanged.emit(false);
  }

  getLoggedInUser(): Token | null {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr !== null) {
      const tokenObj = JSON.parse(tokenStr) as { Authorization: string };
      const tokenInfo = jwt_decode(tokenObj.Authorization) as Token;
      console.log(tokenInfo);
      return tokenInfo;
    } else {
      return null;
    }
  }

  // GetLoggedInUser(user: User): void {
  //   this.userSource.next(user);
  // }

  getUsers(): Observable<User[]> {
    return this.httpC.get<User[]>(`${environment.BASE_URL}/users`);
  }

  getUser(userId: string): Observable<User> {
    return this.httpC.get<User>(`${environment.BASE_URL}/users/${userId}`);
  }

  getUsersPosts(userId: string): Observable<Post[]> {
    return this.httpC.get<Post[]>(
      `${environment.BASE_URL}/Users/Posts/${userId}`
    );
  }
}
