import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { AuthService } from '@services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
  },
  {
    path: 'posts/:userId',
    component: UserHomeComponent,
  },
  {
    path: ':userId',
    component: UserComponent,
    canActivate: [AuthService],
    canActivateChild: [AuthService],
    children: [
      {
        path: '',
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
