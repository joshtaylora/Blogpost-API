import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../shared/shared.module';
import { PostsService } from './services/posts.service';
import { PostStore } from './services/post.store';
import { PostComponent } from './components/post/post.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent} from './components/post-detail/post-detail.component';
import {  PostEditorComponent} from './components/post-editor/post-editor.component';
import {  PostHomeComponent} from './components/post-home/post-home.component';
import {  PostsCardListComponent } from './components/posts-card-list/posts-card-list.component';
import {  PostsLandingComponent } from './components/posts-landing/posts-landing.component';
import { PostsCardListItemComponent } from './components/posts-card-list-item/posts-card-list-item.component';

@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    PostEditorComponent,
    PostCreateComponent,
    PostsCardListComponent,
    PostHomeComponent,
    PostsLandingComponent,
    PostsCardListItemComponent,
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
    PostComponent,
    PostDetailComponent,
    PostEditorComponent,
    PostCreateComponent,
    PostsCardListComponent,
    PostHomeComponent,
    PostsLandingComponent,
  ],
  providers: [PostsService, PostStore],
})
export class PostsModule {}
