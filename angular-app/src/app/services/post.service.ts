import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  @Output() PostStateChanged = new EventEmitter<boolean>();

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
