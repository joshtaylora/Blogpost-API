import {
  Input,
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Editor, Validators, Toolbar, toDoc, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() content: string | undefined;
  @Input() showMenu: boolean;
  @Input() isEditable: boolean;

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
    editorContent: new FormControl('', Validators.required()),
  });

  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
    if (this.isEditable === undefined) {
      this.isEditable = true;
      this.showMenu = true;
    }
    if (this.content !== undefined) {
      this.editor.setContent(toHTML(JSON.parse(this.content)));
    } else {
      this.content = '';
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
