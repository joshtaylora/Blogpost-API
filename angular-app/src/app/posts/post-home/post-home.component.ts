import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Editor, toDoc } from 'ngx-editor';
/* Import dev defined models */
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
/* Import dev defined services */
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

import { EditorComponent } from 'src/app/comp/editor/editor.component';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css'],
})
export class PostHomeComponent implements AfterViewInit {
  post: Post;
  canEdit: boolean;
  user: User | null = null;
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngAfterViewInit(): void {
    const userToken = this.userService.getLoggedInUser();
    if (userToken !== null && userToken.UserData !== undefined) {
      this.canEdit = true;
      this.user = userToken.UserData;
      this.getPost();
      this.editor.content = JSON.stringify(toDoc(this.post.content));
    } else {
      this.canEdit = false;
    }
  }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId !== null && this.user.userId !== undefined) {
      this.postService.getPost(+postId).subscribe((post) => (this.post = post));
    }
  }
}
