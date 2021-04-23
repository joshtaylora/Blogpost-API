import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '@posts/services/posts.service';

@Injectable()
export class PostStore {
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  // make a readonly version of the Observable for the post array forward facing
  public readonly posts: Observable<Post[]> = this._posts.asObservable();

  constructor(private postsSvc: PostsService) {}

  loadInitialPosts(userId: string | null): void {
    if (userId) {
      this.postsSvc.getPostsByUserId(userId).subscribe(
        (posts) => {
          this._posts.next(posts);
        },
        (error) => {
          console.log({
            error: `Error while attempting to retrieve posts for user with userId = ${userId}`,
            errorCode: error,
          });
        }
      );
    } else {
      this.postsSvc.getAllPosts().subscribe(
        (posts) => {
          this._posts.next(posts);
        },
        (error) => {
          console.log({
            source: 'PostStore',
            errorCode: error,
            message:
              'Error occurred while attempting to retrieve posts using the PostsService method getAllPosts',
          });
        }
      );
    }
  }

  addPost(newPost: Partial<Post>) {
    this.postsSvc.createPost(newPost).subscribe();
  }
}
