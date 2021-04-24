import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { PostStore } from '@posts/services/post.store';
import { UserStore } from '@users/services/user.store';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { Observable } from 'rxjs';
import { User } from '@users/models/user.model';
import { Post } from '@posts/models/post.model';
import { PostsService } from '@posts/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  posts: Post[];
  posts$: Observable<Post[]>;
  @Input() user: User;
  @Output() userId: string;
  constructor(
    private auth: AuthTokenStore,
    public postStore: PostStore,
    private userStore: UserStore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userStore.getUser(this.userId).subscribe((user)=> {
      this.user = user;
    });
  }


  getUserData(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userStore.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
  }

  // getUsersPosts(): void {
  //   this.postStore.getUsersPosts(this.userId).subscribe((posts) => {
  //     this.posts = posts;
  //   });
  // }
}
