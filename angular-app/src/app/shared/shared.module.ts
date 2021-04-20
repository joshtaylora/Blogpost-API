import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { FormInputDirective } from './directives/form-input.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { PostsLinkDirective } from './directives/posts-link.directive';
import { SelectPostDirective } from './directives/select-post.directive';
import { UsersLinkDirective } from './directives/users-link.directive';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonDirective,
    FormInputDirective,
    HighlightDirective,
    PostsLinkDirective,
    SelectPostDirective,
    UsersLinkDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ButtonDirective,
    FormInputDirective,
    HighlightDirective,
    PostsLinkDirective,
    SelectPostDirective,
    UsersLinkDirective,
  ],
})
export class SharedModule {}
