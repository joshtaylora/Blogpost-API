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
  posts: Post[];

  constructor(private postsService: PostsService) {}
  postToDisplay: Post;
  selectedPost?: Post;

  ngOnInit(): void {
    if (this.posts === undefined || this.posts === null) {
      this.reloadPosts();
    }
  }

  reloadPosts(): void {
    this.postsService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
}
