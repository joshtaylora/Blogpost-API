import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  @Output() PostStateChanged = new EventEmitter<boolean>();

  /*@TODO
   * NEED TO research BehaviorSubject, map, pipe, and tap from rxjs,
   * as well as setup lazy loading with my modules
   */

  private defaultPost: Post = new Post(
    1,
    '2021-03-13',
    'First Test Post',
    'This is a test post, the first of its kind. Hopefully this sqlite3 database insert works!',
    'admin',
    'Josh.JPG',
    '2021-03-13'
  );

  private postArraySource = new BehaviorSubject(this.defaultPost);
  currentPost = this.postArraySource;

  constructor(private httpC: HttpClient, private userSvc: UserService) {}

  userIsLoggedIn = false;

  getPosts(): Observable<Post[]> {
    return this.httpC.get<Post[]>(`${environment.BASE_URL}/posts`);
  }

  getPost(postId: number): Observable<Post> {
    return this.httpC.get<Post>(`${environment.BASE_URL}/posts/${postId}`);
  }

  deletePost(postId: number) {
    // return true if post was able to be deleted, return false if it was not
    return this.httpC.delete(`${environment.BASE_URL}/posts/${postId}`);
  }

  updatePost(postId: number, post: { content: string; headerImage: string }) {
    return this.httpC.patch(`${environment.BASE_URL}/posts/${postId}`, post);
  }

  createPost(post: Post) {
    // add route handling here
  }
}
