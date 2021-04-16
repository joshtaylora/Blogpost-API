import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  post: Post | null;
  success: boolean;
  newPost: {
    title: string;
    userId: string;
    content: string;
    headerImage: string;
  };

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.newPost = {
      title: '',
      userId: '',
      content: '',
      headerImage: '',
    };
    this.success = false;
  }
  onSubmit(): void {
    this.success = true;
  }
}
