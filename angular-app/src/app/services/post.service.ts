import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  @Output() PostStateChanged = new EventEmitter<boolean>();

  constructor(private httpC: HttpClient) {}


  userIsLoggedIn: boolean = false;

  getPosts(): Observable<Post[]> {
    return this.httpC.get<Post[]>(`${environment.BASE_URL}/Posts`);
  }

  getPost(postId: number): Observable<Post> {
    return this.httpC.get<Post>(`${environment.BASE_URL}/Posts/${postId}`);
  }
}
