import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostService } from '@services/post.service';

@Component({
  selector: 'app-posts-landing',
  templateUrl: './posts-landing.component.html',
  styleUrls: ['./posts-landing.component.css'],
})
export class PostsLandingComponent implements OnInit {
  constructor(private router: Router, private postSvc: PostService) {}
  postToDisplay: Post;
  selectedPost?: Post;

  ngOnInit(): void {}

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  newPost(): void {
    this.router.navigate(['/posts', 'new']);
  }
}
