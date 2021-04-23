import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PostEditorComponent } from '@posts/post-editor/post-editor.component';
import { Post } from '@posts/models/post.model';
import { toDoc } from 'ngx-editor';
import { PostsService } from '@posts/services/posts.service';
import { Observable } from 'rxjs';
import { PostDataService } from '@posts/services/post-data.service';

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
  post$: Observable<Post>;

  @ViewChild(PostEditorComponent) editor: PostEditorComponent;
  constructor() {}

  ngAfterViewInit(): void {
    this.newPost.content = JSON.stringify(toDoc(this.editor.html));
  }

  onSubmit(): void {
    console.log(this.editor.html);
  }
}
