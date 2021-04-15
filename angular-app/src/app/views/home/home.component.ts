import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  posts: Post[] | null = null;
  selectedPost?: Post;
  userIsLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userSvc: UserService,
    private postSvc: PostService
  ) {}

  ngOnInit(): void {
    let userToken = this.userSvc.getLoggedInUser();
    if (userToken !== null && userToken.UserData !== undefined) {
      this.getPosts();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getPosts(): void {
    let userToken = this.userSvc.getLoggedInUser();
    console.log(userToken);
    if (userToken !== null && userToken.UserData !== undefined) {
      this.userIsLoggedIn = true;
      this.user = userToken.UserData;
      this.userSvc.getUsersPosts(userToken.UserData.userId).subscribe(
        (postArray) => {
          this.posts = postArray;
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.userIsLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
}
