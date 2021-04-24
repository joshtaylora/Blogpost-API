import { Component, OnInit } from '@angular/core';
import { PostsService } from '@posts/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '@posts/models/post.model';
import { UserStore } from '@users/services/user.store';
import { User } from '@users/models/user.model';

@Component({
  selector: 'app-users-card-list',
  templateUrl: './users-card-list.component.html',
  styleUrls: ['./users-card-list.component.css'],
})
export class UsersCardListComponent implements OnInit {

  users: User[];
  selectedUser: User;
  constructor(private userStore: UserStore) {
  }

  ngOnInit(): void {

    this.userStore.users.subscribe((users)=> {
      this.users = users;
    });

  }

  onSelect(user: User) {
    this.selectedUser = user;
  }

}
