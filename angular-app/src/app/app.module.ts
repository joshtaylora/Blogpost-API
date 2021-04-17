import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './views/post-list/post-list.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './views/user-home/user-home.component';
import { PostDetailComponent } from './comp/post-detail/post-detail.component';
import { PostsComponent } from './comp/posts/posts.component';
import { UsersComponent } from './comp/users/users.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SelectPostDirective } from './directives/select-post.directive';
import { UsersLinkDirective } from './directives/users-link.directive';
import { PostsLinkDirective } from './directives/posts-link.directive';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './comp/editor/editor.component';
import { FormInputDirective } from './directives/form-input.directive';
import { PostHomeComponent } from './views/post-home/post-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    PostListComponent,
    UserListComponent,
    UserHomeComponent,
    PostDetailComponent,
    PostsComponent,
    UsersComponent,
    HighlightDirective,
    SelectPostDirective,
    UsersLinkDirective,
    PostsLinkDirective,
    CreatePostComponent,
    EditorComponent,
    FormInputDirective,
    PostHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
