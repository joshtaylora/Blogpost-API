import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './views/post-list/post-list.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './views/user-home/user-home.component';
import { PostDetailComponent } from './comp/post-detail/post-detail.component';
import { PostsComponent } from './comp/posts/posts.component';
import { UsersComponent } from './comp/users/users.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
