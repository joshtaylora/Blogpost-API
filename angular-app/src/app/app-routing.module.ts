import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './comp/users/users.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserHomeComponent } from './views/user-home/user-home.component';
import { PostDetailComponent } from './comp/post-detail/post-detail.component';
import { PostListComponent } from './views/post-list/post-list.component';
import { CreatePostComponent } from './views/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService],
  },
  {
    path: 'posts/:postId',
    component: PostDetailComponent,
  },
  {
    path: 'posts/new',
    component: CreatePostComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },

  {
    path: 'users/Posts/:userId',
    component: UserHomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
