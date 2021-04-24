import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PostsModule } from '@posts/posts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from './services/user.service';
import { UserStore } from './services/user.store';
import { UserHomeComponent } from './user-home/user-home.component';
import { UsersCardListComponent } from './users-card-list/users-card-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent,
    UsersCardListComponent,
    UserSettingsComponent
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule, PostsModule],
  exports: [
    UserComponent,
    UserHomeComponent,
    UsersCardListComponent,
    UserSettingsComponent
  ],
  providers: [UserService, UserStore],
})
export class UsersModule {}
