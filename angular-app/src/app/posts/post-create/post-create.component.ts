import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PostEditorComponent } from '@posts/post-editor/post-editor.component';
import { Post } from '@posts/models/post.model';
import { toDoc } from 'ngx-editor';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
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
  @ViewChild(PostEditorComponent) editor;
  constructor() { }

  ngAfterViewInit(): void {
    this.newPost.content = JSON.stringify(toDoc(this.editor.html));
  }

  onSubmit(): void {
    console.log(this.editor.html);
  }
}
