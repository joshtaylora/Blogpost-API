import {
  Input,
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Validators, Toolbar, toDoc, toHTML } from 'ngx-editor';



@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  @Input()
  get content(): string { return this._content}
  set content(content: string) {
    this._content = (content || '');
  }
  private _content = '';

  @Input() showMenu: boolean;
  @Input()
  get isEditable(): boolean { return this._isEditable }
  set isEditable(isEditable: boolean) {
    this._isEditable = (isEditable || false);
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
  form = new FormGroup({
    editorContent: new FormControl('', { updateOn: 'submit'}),
  });

  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
    if (this.isEditable === undefined) {
      this.isEditable = true;
      this.showMenu = true;
    }
    if (this.content !== undefined && this.content !== null) {
      this.editor.setContent(this.content);
    } else {
      this.content = '';
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}