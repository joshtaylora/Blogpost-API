import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { Editor } from 'ngx-editor';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { PostsService } from '@posts/services/posts.service';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { PostDataService} from '@posts/services/post-data.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() showMenu: boolean;
  @Input() isEditable: boolean;
  editor: Editor;
  faDeletePostIcon = faRecycle;
  userLoggedIn: boolean;
  loggedInUser: User;

  subscription: Subscription;

  editorContent$: Observable<string>;

  token: Token;

  constructor(
    private auth: AuthTokenStore,
    private postsSvc: PostsService,
    private postContentSvc: PostDataService
  ) {
    this.editorContent$ = this.postContentSvc.getPost();

    this.auth.token$.subscribe((token) => {
      this.token = token;
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this.loggedInUser = this.token.UserData;
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    if (this.showMenu === undefined || this.showMenu === null) {
      this.showMenu = false;
    }
    if (this.isEditable === undefined || this.isEditable === null) {
      this.isEditable = false;
    }
  }

  saveContent() {
    this.subscription = this.postContentSvc.getPost().subscribe(content => {
      this.post.content = content;
    })

    this.postsSvc.patchPost(this.post.postId, this.post);
  }
}
