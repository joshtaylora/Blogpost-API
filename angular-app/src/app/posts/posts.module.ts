import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { PostsCardListComponent } from './posts-card-list/posts-card-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostsService } from './services/posts.service';
import { PostHomeComponent } from './post-home/post-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonDirective } from '../directives/button.directive';
import { UsersLinkDirective } from '../directives/users-link.directive';
import { PostsLinkDirective } from '../directives/posts-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostCreateComponent } from './post-create/post-create.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsCardListComponent,
    PostDetailComponent,
    PostEditorComponent,
    PostHomeComponent,
    PostCreateComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FontAwesomeModule,
    ButtonDirective,
    UsersLinkDirective,
    PostsLinkDirective,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        aligh_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, etc...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    ButtonDirective,
    UsersLinkDirective,
    PostsLinkDirective,ReactiveFormsModule, FormsModule
  ]
  providers: [PostsService],
})
export class PostsModule {}
