import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Post } from '../models/post.model';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostHomeComponent } from './components/post-home/post-home.component';
import { PostComponent } from './components/post/post.component';
import { PostsLandingComponent } from './components/posts-landing/posts-landing.component';

const routes: Routes = [
  {
    path: '',
    component: PostsLandingComponent,
  },
  {
    path: 'new',
    component: PostCreateComponent,
    canActivate: [AuthService],
  },
  {
    path: ':postId',
    component: PostHomeComponent,
    canActivate: [AuthService],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
