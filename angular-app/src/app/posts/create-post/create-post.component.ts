import { ViewChild, AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { toDoc } from 'ngx-editor';
import { Post } from 'src/app/models/post.model';
import { EditorComponent } from '../../comp/editor/editor.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements AfterViewInit {
  post: Post | null;
  success: boolean;
  newPost: {
    title: string;
    userId: string;
    content: string;
    headerImage: string;
  };
  @ViewChild(EditorComponent) editor;

  constructor(private postService: PostService, private router: Router) {
    this.newPost = {
      title: '',
      userId: '',
      content: '',
      headerImage: '',
    };
    this.success = false;
  }

  ngAfterViewInit(): void {
    this.newPost.content = JSON.stringify(toDoc(this.editor.html));
  }
  onSubmit(): void {
    // this.postService.
  }
}
