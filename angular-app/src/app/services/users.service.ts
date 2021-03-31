import { Injectable, EventEmitter, Output } from '@angular/core';
import { User, USERS, getUser } from '../mock-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = USERS;

  userIsLoggedIn: boolean = false;
  user: User | null = null;
  userName: string = '';
  password: string = '';

  @Output() UserStateChanged = new EventEmitter<boolean>();

  constructor() {}

  login(userName: string, password: string): boolean {
    // attempt to retrieve the user from the user-array
    this.user = getUser(userName);
    // if no user could be retrieved from the user-array
    if (this.user === null) {
      this.userIsLoggedIn = false;
      localStorage.setItem(
        'userIsLoggedIn',
        JSON.stringify(this.userIsLoggedIn)
      );
      // emit the user state change as false
      this.UserStateChanged.emit(this.userIsLoggedIn);
      return false;
    }
    // ensure that the user's userId and password match the values passed
    if (this.userName === userName && this.password === password) {
      this.userIsLoggedIn = true;
      localStorage.setItem(
        'userIsLoggedIn',
        JSON.stringify(this.userIsLoggedIn)
      );
      // emit the user state change as true
      this.UserStateChanged.emit(this.userIsLoggedIn);
      return true;
    } else {
      this.userIsLoggedIn = false;
      localStorage.setItem(
        'userIsLoggedIn',
        JSON.stringify(this.userIsLoggedIn)
      );
      this.UserStateChanged.emit(this.userIsLoggedIn);
      return false;
    }
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }
}
