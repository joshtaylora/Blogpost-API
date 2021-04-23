import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { Editor } from 'ngx-editor';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { PostsService } from '@posts/services/posts.service';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
<<<<<<< HEAD
import { PostDataService } from '@posts/services/post-data.service';
import { PostStore } from '@posts/services/post.store';
=======
import { PostDataService} from '@posts/services/post-data.service';

>>>>>>> 388d57456a10310a520d04d0a73b2424504db49d

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() showMenu: boolean;
  @Input() isEditable: boolean;
  @Input() showSaveButton: boolean;
  editor: Editor;
  faDeletePostIcon = faRecycle;
  userLoggedIn: boolean;
  loggedInUser: User;
<<<<<<< HEAD
  // used to display success alert upon successful save, and error message otherwise
  saveSuccess: boolean;
  // message displayed in the alert box
  message: string;
  subscription: Subscription;

  token: Token;

  constructor(private auth: AuthTokenStore, private postStore: PostStore) {
=======

  subscription: Subscription;

  editorContent$: Observable<string>;

  token: Token;

  constructor(
    private auth: AuthTokenStore,
    private postsSvc: PostsService,
    private postContentSvc: PostDataService
  ) {
    this.editorContent$ = this.postContentSvc.getPost();

>>>>>>> 388d57456a10310a520d04d0a73b2424504db49d
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

<<<<<<< HEAD
    if (this.showSaveButton === undefined || this.showSaveButton === null) {
      this.showSaveButton = false;
    }
  }

  saveContent(savedContent: string) {
    this.post.content = savedContent;
    let post$ = this.postStore.updatePost(this.post.postId, this.post);
    post$.subscribe(
      (res) => {
        if (res) {
          this.saveSuccess = true;
          this.message = `Post title "${this.post.title}" was successfully saved`;
        } else {
          this.saveSuccess = false;
          this.message = `Error occurred while attempting to save post with postId = ${this.post.postId} and title = ${this.post.title}`;
        }
      },
      (error) => {
        this.saveSuccess = false;
        this.message = `Error occurred while attempting to save post with postId = ${this.post.postId} and title = ${this.post.title}`;
      }
    );
=======
  saveContent() {
    this.subscription = this.postContentSvc.getPost().subscribe(content => {
      this.post.content = content;
    })

    this.postsSvc.patchPost(this.post.postId, this.post);
>>>>>>> 388d57456a10310a520d04d0a73b2424504db49d
  }
}
