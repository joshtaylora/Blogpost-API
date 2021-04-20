import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostService } from '@services/post.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-posts-card-list',
  templateUrl: './posts-card-list.component.html',
  styleUrls: ['./posts-card-list.component.css'],
})
export class PostsCardListComponent implements OnInit {
  @Input() posts: Post[] | null = null;
  selectedPost?: Post;
  @Input() userId?: string;

  constructor(
    private postSvc: PostService,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    if (!!this.userId) {
      this.userSvc
        .getUsersPosts(this.userId)
        .subscribe((posts: Post[]) => (this.posts = posts));
    } else {
      // if no userId is passed, get all of the posts
      this.postSvc
        .getPosts()
        .subscribe((posts: Post[]) => (this.posts = posts));
    }
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  newPost(): void {
    this.router.navigate(['/posts', 'new']);
  }
}
