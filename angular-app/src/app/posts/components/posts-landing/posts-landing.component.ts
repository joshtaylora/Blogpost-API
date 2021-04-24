import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostStore } from '@posts/services/post.store';
import { PostsService } from '@posts/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-landing',
  templateUrl: './posts-landing.component.html',
  styleUrls: ['./posts-landing.component.css'],
})
export class PostsLandingComponent {
  posts: Post[];

  postToDisplay: Post;
  selectedPost?: Post;

  constructor(public postStore: PostStore) {}


  onSelect(post: Post): void {
    this.selectedPost = post;
  }
}
