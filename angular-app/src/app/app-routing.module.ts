import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './comp/users/users.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserHomeComponent } from './views/user-home/user-home.component';
import { PostsComponent } from './comp/posts/posts.component';
import { PostDetailComponent } from './comp/post-detail/post-detail.component';
import { PostListComponent } from './views/post-list/post-list.component';

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
    path: 'Posts',
    component: PostListComponent,
  },
  {
    path: 'Posts/:postId',
    component: PostDetailComponent,
  },

  {
    path: 'Users/Posts/:userId',
    component: UserHomeComponent,
  },
  {
    path: 'Users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
