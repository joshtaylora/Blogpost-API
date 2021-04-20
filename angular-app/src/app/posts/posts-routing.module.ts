import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostComponent } from './post/post.component';
import { PostsLandingComponent } from './posts-landing/posts-landing.component';

const routes: Routes = [
  {
    path: '',
    component: PostsLandingComponent,
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
