import { Component, OnInit } from '@angular/core';
import { UserService } from '@users/services/user.service';
import { User } from '@users/models/user.model';
import { AuthTokenStore } from '@services/auth/auth-token.store';
import { UserStore } from '@users/services/user.store';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  constructor(private auth: AuthTokenStore, private userStore: UserStore) {}
  user: User;
  ngOnInit(): void {
    this.auth.token$.subscribe((token) => {
      if (token) {
        this.user = token.UserData;
      }
    });
  }

  //deleteUser();
}
