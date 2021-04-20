import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postArraySource = new BehaviorSubject(this.defaultPost);
  constructor() {}
}
