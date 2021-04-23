import { Component, OnInit } from '@angular/core';
import { PostStore } from '@posts/services/post.store';
import { UserStore } from '@users/services/user.store';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { Observable } from 'rxjs';
import { User } from '@users/models/user.model';
import { Post } from '@posts/models/post.model';
import { PostsService } from '@posts/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  posts: Post[];
  posts$: Observable<Post[]>;
  user: User;
  constructor(
    private auth: AuthTokenStore,
    private postsSvc: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.token$.subscribe((token) => {
      if (token) {
        this.user = token.UserData;
      }
    });
    this.getUsersPosts();
  }

  getUsersPosts(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId !== null && userId !== undefined) {
      this.posts$ = this.postsSvc.getPostsByUserId(userId);
      this.posts$.subscribe(
        (posts) => {
          this.posts = posts;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
