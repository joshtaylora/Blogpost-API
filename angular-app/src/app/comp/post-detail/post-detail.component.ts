import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { EditorComponent } from '../../comp/editor/editor.component';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post | undefined;
  @Input() showMenu: boolean;
  @Input() isEditable: boolean;
  editor: Editor;
  faDeletePostIcon = faRecycle;
  constructor() {}

  ngOnInit(): void {
    if (this.showMenu === undefined || this.showMenu === null) {
      this.showMenu = false;
    }
    if (this.isEditable === undefined || this.isEditable === null) {
      this.isEditable = false;
    }
  }

}
