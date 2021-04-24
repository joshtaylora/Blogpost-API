import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '@posts/models/post.model';
import { toDoc} from 'ngx-editor';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { PostStore } from '@posts/services/post.store';
import { PostEditorComponent } from '@posts/components/post-editor/post-editor.component';

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
  message: string;
  currentUserToken: Token;
  currentUser: User;

  @ViewChild(PostEditorComponent) editor: PostEditorComponent;

  constructor(private auth: AuthTokenStore, public postStore: PostStore) {
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

  saveContent(savedContent: string) {
    this.newPost.content = savedContent;
    this.postStore.addPost(this.newPost).subscribe((res)=> {
      this.success = true;
      this.message = "Post successfully created";
    }, (err)=> {
      this.success=false;
      this.message = `Error occurred while creating post: ${err}`
    })
  }


}
