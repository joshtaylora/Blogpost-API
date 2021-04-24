import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@users/models/user.model';
import { UserService } from '@users/services/user.service';

@Injectable()
export class UserStore {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private userSvc: UserService) {
    this.loadInitialUsers();
  }

  get users() {
    return this._users.asObservable();
  }

  loadInitialUsers() {
    this.userSvc.getAllUsers().subscribe(
      (users) => {
        this._users.next(users);
      },
      (error) => {
        console.log({
          errorMsg: `Error while attempting to retrieve usrs within the UserStore file in users/services/user.store.ts`,
          errorCode: error,
        });
      }
    );
  }

  addUser(newUser: User) {
    return this.userSvc.createUser(newUser).subscribe((user: User) => {
      const oldArray = this._users.getValue();
      const newArray = [...oldArray, user];
      this._users.next(newArray);
    });
  }

  deleteUser(userId: string) {
    return this.userSvc.deleteUser(userId).subscribe((res)=> {
      const oldArray = this._users.getValue();
      const index = oldArray.findIndex((user)=> user.userId === userId);
      const newArray = oldArray.splice(index, 1);
      this._users.next(newArray);
    });
  }

  patchUser(userId: string, user:Partial<User>) {
    return this.userSvc.patchUser(userId, user).subscribe((res)=> {
      const oldArray = this._users.getValue();
      const index = oldArray.findIndex((user)=> user.userId === userId);
      oldArray.splice(index, 1);
      const newArray = [...oldArray, res];
      this._users.next(newArray);
    })
  }

  getUser(userId: string) {
    return this.userSvc.getUserById(userId);
  }
}
