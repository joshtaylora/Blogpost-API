import { Input, Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostsService } from '../services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-card-list',
  templateUrl: './posts-card-list.component.html',
  styleUrls: ['./posts-card-list.component.css'],
})
export class PostsCardListComponent implements OnInit {
  @Input() posts: Post[] = [];
  posts$: Observable<Post[]>;
  selectedPost?: Post;
  @Input() userId?: string;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    if (this.userId !== null && this.userId !== undefined) {
      this.getPostsByUser(this.userId);
    } else {
      this.getPosts();
    }
  }

  getPosts(): void {
    // if no userId is passed, get all of the posts
    this.postsService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  getPostsByUser(userId: string): void {
    this.postsService
      .getPostsByUserId(userId)
      .subscribe((posts) => (this.posts = posts));
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  newPost(): void {
    this.router.navigate(['/posts', 'new']);
  }
}
