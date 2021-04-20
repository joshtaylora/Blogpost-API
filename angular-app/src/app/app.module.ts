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
import { PostsComponent } from './views/posts/posts.component';
import { UsersComponent } from './comp/users/users.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SelectPostDirective } from './directives/select-post.directive';
import { UsersLinkDirective } from './directives/users-link.directive';
import { PostsLinkDirective } from './directives/posts-link.directive';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';
import { FormInputDirective } from './directives/form-input.directive';
import { PostHomeComponent } from './posts/post-home/post-home.component';
import { ButtonDirective } from './directives/button.directive';
import { PostsModule } from '@posts/posts.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    UserListComponent,
    UserHomeComponent,
    UsersComponent,
    HighlightDirective,
    SelectPostDirective,
    UsersLinkDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule,
    PostsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

