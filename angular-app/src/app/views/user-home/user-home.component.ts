import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  userId: string = '';
  posts: Post[] | null = null;
  noPosts = false;
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId !== null && userId !== undefined) {
      this.userId = userId;
      this.userService.getUsersPosts(userId).subscribe(
        (posts) => {
          this.posts = posts;
        },
        (error) => {
          this.noPosts = true;
        }
      );
    } else {
      this.location.back();
    }
  }
}
