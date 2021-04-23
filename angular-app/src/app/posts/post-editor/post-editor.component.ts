import {
  Input,
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PostDataService } from '@posts/services/post-data.service';
import { PostsService } from '@posts/services/posts.service';
import { Editor, Validators, Toolbar, toDoc, toHTML } from 'ngx-editor';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
})
export class PostEditorComponent implements OnInit, OnDestroy {
  @Output() saveContentEvent = new EventEmitter<string>();

  @Input() post: Post;
  @Input()
  get content(): string {
    return this._content;
  }
  set content(content: string) {
    this._content = content || '';
  }
  private _content = '';

  @Input() showMenu: boolean;

  @Input() showSaveButton: boolean;

  @Input()
  get isEditable(): boolean {
    return this._isEditable;
  }
  set isEditable(isEditable: boolean) {
    this._isEditable = isEditable || false;
  }
  private _isEditable = false;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  form = new FormGroup({});

  myForm: FormGroup;

  html = '';

  constructor(
    private formBuilder: FormBuilder,
    private postsSvc: PostsService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      editorContent: new FormControl('', { updateOn: 'change' }),
    });

    this.editor = new Editor();
    if (this.isEditable === undefined) {
      this.isEditable = true;
      this.showMenu = true;
    }
    if (this.content !== undefined || this.content !== null) {
      this.editor.setContent(this.content);
    } else {
      this.content = '';
    }
  }

  onChanges() {
    this.editor.valueChanges.subscribe((val) => {
      this.content = JSON.stringify(val);
    });
  }

  saveContent(savedContent: string) {
    this.saveContentEvent.emit(savedContent);
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
