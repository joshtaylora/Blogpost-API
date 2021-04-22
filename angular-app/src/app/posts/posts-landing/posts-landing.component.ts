import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostsService } from '@posts/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-landing',
  templateUrl: './posts-landing.component.html',
  styleUrls: ['./posts-landing.component.css'],
})
export class PostsLandingComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {}
  postToDisplay: Post;
  selectedPost?: Post;

  ngOnInit(): void {}

  reloadPosts() {
    const posts$ = this.postsService.getAllPosts();
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
}
