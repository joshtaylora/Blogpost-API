import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, map, filter, find } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '@posts/services/posts.service';

@Injectable()
export class PostStore {
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject([]);

  constructor(private postsSvc: PostsService) {
    this.loadInitialPosts();
  }

  posts$ = this._posts.asObservable();

  get posts(): Post[] {
    return this._posts.getValue();
  }

  usersPosts$: Observable<Post[]>;

  getUsersPosts(userId: string) {
    this.usersPosts$ = this.postsSvc.getPostsByUserId(userId);
  }


  loadInitialPosts(): void {
    this.postsSvc.getAllPosts().subscribe((posts) => {
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



  addPost(newPost: Partial<Post>): Observable<Post> {
    let obs = this.postsSvc.createPost(newPost);
    obs.subscribe((post: Post) => {
      const oldArray = this._posts.getValue();
      const updatedArray = [...oldArray, post];
      this._posts.next(updatedArray);
    });
    return obs;
  }


  deletePost(postId: number): Observable<Post> {
    let obs = this.postsSvc.deletePost(postId);
    obs.subscribe((res) => {
      const oldArray = this._posts.getValue();
      const index = oldArray.findIndex((post) => (post.postId = postId));
      const newArray = oldArray.splice(index, 1);
      this._posts.next(newArray);
    });
    return obs;
  }

  updatePost(postId: number, updatedPost: Partial<Post>): Observable<Post> {
    let obs = this.postsSvc.patchPost(postId, updatedPost);
    obs.subscribe((res) => {
      const oldArray = this._posts.getValue();
      const index = oldArray.findIndex((post) => post.postId === postId);
      oldArray.splice(index, 1);
      const newArray = [...oldArray, res];
      this._posts.next(newArray);
    });
    return obs;
  }
}
