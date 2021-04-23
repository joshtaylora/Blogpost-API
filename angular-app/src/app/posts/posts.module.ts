import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { PostsCardListComponent } from './posts-card-list/posts-card-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostHomeComponent } from './post-home/post-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsLandingComponent } from './posts-landing/posts-landing.component';
import { SharedModule } from '../shared/shared.module';
import { PostsService } from './services/posts.service';
import { PostStore } from './services/post.store';

@NgModule({
  declarations: [
    PostComponent,
    PostsCardListComponent,
    PostDetailComponent,
    PostEditorComponent,
    PostHomeComponent,
    PostCreateComponent,
    PostsLandingComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
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
    ReactiveFormsModule,
    FormsModule,
    PostCreateComponent,
    PostsLandingComponent,
    PostsCardListComponent,
    PostHomeComponent,
    PostDetailComponent,
  ],
  providers: [PostsService, PostStore],
})
export class PostsModule {}
