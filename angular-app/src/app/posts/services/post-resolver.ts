import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PostsService } from './posts.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    const postId = route.paramMap.get('postId');
    return this.postService.loadPostById(postId);
  }
}
