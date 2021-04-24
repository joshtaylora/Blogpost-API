import { Input, Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import { PostStore } from '@posts/services/post.store';

@Component({
  selector: 'app-posts-card-list',
  templateUrl: './posts-card-list.component.html',
  styleUrls: ['./posts-card-list.component.css'],
})
export class PostsCardListComponent implements OnInit{
  selectedPost?: Post;
  @Input() userId?: string | null;
  @Output() emitPost = new EventEmitter<Post>();
  @Input() post: Post;
  posts: Post[];
  constructor(
    private router: Router,
    public postStore: PostStore,
    public postsSvc: PostsService) {}

  ngOnInit(): void {
    if (this.userId !== undefined && this.userId !== null) {
      this.postsSvc.getPostsByUserId(this.userId).subscribe((posts)=> {
        this.posts = posts;
      });
    }  }

  navigateToPost(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  // getPostsByUser(userId: string): void {
  //   this.postsSvc
  //     .getPostsByUserId(userId)
  //     .subscribe((posts) => (this.posts = posts));
  // }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.emitPost.emit(this.selectedPost);
    // this.passPost();
  }

  userIdEvent(userId:string) {
    this.userId = userId;
  }

  // passPost() {
  //   this.postsSvc.getPostById(this.selectedPost.postId);
  // }

  newPost(): void {
    this.router.navigate(['/posts', 'new']);
  }

}
