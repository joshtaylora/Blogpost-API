import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@posts/models/post.model';
import { PostEditorComponent } from '@posts/post-editor/post-editor.component';
import { UserService } from '@services/user.service';
import { toDoc } from 'ngx-editor';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { PostService } from '@services/post.service';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css'],
})
export class PostHomeComponent implements OnInit {
  post: Post;
  canEdit: boolean;
  user: User | null = null;
  @ViewChild(PostEditorComponent) editor: PostEditorComponent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const userToken = this.userService.getLoggedInUser();
    if (userToken) {

      this.canEdit = true;
      this.user = userToken.UserData;

      this.getPost();

    } else {
      this.canEdit = false;
    }
  }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      this.postService.getPost(+postId).subscribe((post) => this.post = post);
    }
  }
}
