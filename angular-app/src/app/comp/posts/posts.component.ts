import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// model imports
import { Post } from '../../models/post.model';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] | null = null;
  selectedPost?: Post;
  @Input() userId?: string;

  constructor(
    private userSvc: UserService,
    private postSvc: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    if (this.userId === undefined) {
      this.postSvc.getPosts().subscribe((posts) => (this.posts = posts));
    } else {
      this.userSvc
        .getUsersPosts(this.userId)
        .subscribe((posts: Post[]) => (this.posts = posts));
    }
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  newPost(): void {
    // form submission for new post
    this.router.navigate(['/']);
  }
}
