import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../models/post.model';
import { Editor } from 'ngx-editor';
import { User } from 'src/app/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { PostStore } from '@posts/services/post.store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '@users/services/user.store';
import { PostsService } from '@posts/services/posts.service';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

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
  // used to display success alert upon successful save, and error message otherwise
  saveSuccess: boolean;
  // message displayed in the alert box
  message: string;
  subscription: Subscription;

  postId: number;
  token: Token;

  constructor(private auth: AuthTokenStore, public postStore: PostStore, private postsSvc: PostsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.auth.token$.subscribe((token) => {
      this.token = token;
    });

    if (this.token) {
      this.loggedInUser = this.token.UserData;
    } else {
      this.userLoggedIn = false;
    }

    if (this.showMenu === undefined || this.showMenu === null) {
      this.showMenu = false;
    }
    if (this.isEditable === undefined || this.isEditable === null) {
      this.isEditable = false;
    }

    if (this.showSaveButton === undefined || this.showSaveButton === null) {
      this.showSaveButton = false;
    }

    if (this.post.userId === this.loggedInUser.userId) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    this.postId = +this.route.snapshot.paramMap.get('postId');

  }


  navigateToPost(postId: number) {
    this.router.navigateByUrl(`/posts/${postId}`, {
      state: {
        post: this.post
      }
    })
  }

  saveContent(savedContent: string) {
    this.post.content = savedContent;
    if(this.loggedInUser.userId !== this.post.userId) {
      this.saveSuccess = false;
      this.message = `User: ${this.loggedInUser.userId} is not the author of this post and thus cannot edit it`;
    }
    this.postStore.updatePost(this.post.postId, this.post)
    .subscribe(
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
  }
}
