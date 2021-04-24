import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '@posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  private subject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public getPost(): Observable<string> {
    return this.subject.asObservable();
  }

  public sendPost(content: string): void {
    this.subject.next(content);
  }
}
