import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './comp/users/users.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserHomeComponent } from './views/user-home/user-home.component';

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
    path: 'users/posts/:userId',
    component: UserHomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
];
/*
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'posts/new',
    component: CreatePostComponent,
  },
  {
    path: 'posts/:postId',
    component: PostHomeComponent,
  },

*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
