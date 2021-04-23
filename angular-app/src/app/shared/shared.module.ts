import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { FormInputDirective } from './directives/form-input.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { PostsLinkDirective } from './directives/posts-link.directive';
import { SelectPostDirective } from './directives/select-post.directive';
import { UsersLinkDirective } from './directives/users-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    ButtonDirective,
    FormInputDirective,
    HighlightDirective,
    PostsLinkDirective,
    SelectPostDirective,
    UsersLinkDirective,
    AlertComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ButtonDirective,
    FormInputDirective,
    HighlightDirective,
    PostsLinkDirective,
    SelectPostDirective,
    UsersLinkDirective,
    AlertComponent,
  ],
})
export class SharedModule {}
