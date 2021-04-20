import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersCardListComponent } from './users-card-list/users-card-list.component';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';


@NgModule({
  declarations: [UserProfileComponent, UsersCardListComponent, UserComponent, UserHomeComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
