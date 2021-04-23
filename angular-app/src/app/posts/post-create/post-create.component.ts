import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PostEditorComponent } from '@posts/post-editor/post-editor.component';
import { Post } from '@posts/models/post.model';
import { Editor, toDoc, Toolbar } from 'ngx-editor';
import { PostsService } from '@posts/services/posts.service';
import { Observable } from 'rxjs';
import { PostDataService } from '@posts/services/post-data.service';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { error } from '@angular/compiler/src/util';
import { PostStore } from '@posts/services/post.store';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements AfterViewInit {
  post: Post | null;
  success: boolean;
  newPost: {
    title: string;
    userId: string;
    content: string;
    headerImage: string;
  };

  currentUserToken: Token;
  currentUser: User;

  @ViewChild(PostEditorComponent) editor: PostEditorComponent;

  constructor(private auth: AuthTokenStore, private postStore: PostStore) {
    this.newPost = { title: '', userId: '', content: '', headerImage: '' };
  }

  ngAfterViewInit(): void {
    this.auth.token$.subscribe(
      (token) => {
        this.currentUserToken = token;
        this.currentUser = token.UserData;
        this.success = true;
      },
      (error) => {
        this.success = false;
        console.log(error);
      }
    );

    this.newPost.userId = this.currentUser.userId;

    this.newPost.content = JSON.stringify(toDoc(this.editor.html));
  }

  onSubmit(): void {
    this.postStore.addPost(this.newPost);
    console.log(this.editor.html);
    console.log(this.currentUser.userId);
  }
}
