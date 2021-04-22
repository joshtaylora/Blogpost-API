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

  getPostById(postId: number): Observable<Post> {
    return this.httpClient
      .get<Post>(`${this.postsURL}/${postId}`)
      .pipe(shareReplay());
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postsURL}`);
  }

  creatPost(postId: number, post: Post): Observable<any> {
    return this.httpClient.post(`${this.postsURL}/${postId}`, {
      title: post.title,
      content: post.content,
      userId: post.userId,
      headerImage: post.headerImage
    });
  }

  patchPost(postId: number, changes: Partial<Post>): Observable<any> {
    return this.httpClient.patch(`${this.postsURL}/${postId}`, {
      content: changes?.content,
      headerImage: changes?.headerImage,
    });
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.delete(`${this.postsURL}/${postId}`);
  }
}
