import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '@env';
import { shareReplay, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';

import { UserService } from '@services/user.service';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsURL = `${environment.BASE_URL}/Posts`;

  currentUser: Token | null;

  constructor(private httpClient: HttpClient, private auth: AuthTokenStore) {
    this.auth.token$.subscribe((token) => {
      this.currentUser = token;
    });
  }

  getPostById(postId: number): Observable<Post> {
    return this.httpClient
      .get<Post>(`${this.postsURL}/${postId}`)
      .pipe(shareReplay());
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postsURL}`).pipe(shareReplay());
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(`${environment.BASE_URL}/Users/Posts/${userId}`)
      .pipe(shareReplay());
  }

  createPost(post: Partial<Post>): Observable<Post> {
    const token = localStorage.getItem('token');
    const authBearer = JSON.parse(token) as { Authorization: string };
    return this.httpClient.post<Post>(
      `${this.postsURL}/`,
      {
        title: post.title,
        content: post.content,
        userId: post.userId,
        headerImage: post.headerImage,
      },
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `${authBearer.Authorization}`
        ),
      }
    );
  }

  patchPost(postId: number, changes: Partial<Post>): Observable<any> {
    const token = localStorage.getItem('token');
    const authBearer = JSON.parse(token) as { Authorization: string };
    return this.httpClient
      .patch(
        `${this.postsURL}/${postId}`,
        {
          userId: `${changes.userId}`,
          content: changes?.content,
          headerImage: changes?.headerImage,
        },
        {
          headers: new HttpHeaders().set(
            `Authorization`,
            `${authBearer.Authorization}`
          ),
        }
      )
      .pipe(
        tap(() => {
          'Patch post method call';
        })
      );
  }

  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const authBearer = JSON.parse(token) as { Authorization: string };
    return this.httpClient
      .delete(`${this.postsURL}/${postId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `${authBearer.Authorization}`
        ),
      })
      .pipe(shareReplay());
  }
}
