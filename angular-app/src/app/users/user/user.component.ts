import { Component, OnInit, Input } from '@angular/core';
import { UserStore } from '@users/services/user.store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  constructor(public userStore: UserStore) { }

  ngOnInit(): void {
  }

  onUpdateUser(userId: string, user:Partial<User>) {
    this.userStore.patchUser(userId, user);
  }

  onDeleteUser(userId: string) {
    this.userStore.deleteUser(userId);

  }

}
