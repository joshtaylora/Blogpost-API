import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
import { shareReplay } from 'rxjs/operators';
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsURL = `${environment.BASE_URL}/posts`;

  constructor(private httpClient: HttpClient) {}

  loadPostById(postId: string): Observable<Post> {
    return this.httpClient
      .get<Post>(`${this.postsURL}/${postId}`)
      .pipe(shareReplay());
  }

  loadAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postsURL}`);
  }

  updatePost(postId: string, changes: Partial<Post>): Observable<any> {
    return this.httpClient.patch(`${this.postsURL}/${postId}`, {
      content: changes?.content,
      headerImage: changes?.headerImage,
    });
  }
}
