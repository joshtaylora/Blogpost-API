import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faPlus,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { AuthTokenStore } from '@services/auth/auth-token.store';

import { Token } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  userIsLoggedIn: boolean;

  faSignInIcon = faSignInAlt;
  faSignOutIcon = faSignOutAlt;
  faRegisterIcon = faUserPlus;
  faNewPostIcon = faPlus;
  faHomeIcon = faHome;
  faSettingsIcon = faCog;
  currentUser: Token | null = null;


  constructor(
    private auth: AuthTokenStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.getToken();
    this.auth.userLoggedIn$.subscribe((status) => {
      this.userIsLoggedIn = status;
    });
  }

  goToNewPost(): void {
    this.router.navigate(['/posts', 'new']);
  }

  getToken(): void {
    this.auth.token$.subscribe((token) => {
      this.currentUser = token;
      if (token) {
        this.userIsLoggedIn = true;
      } else {
        this.userIsLoggedIn = false;
      }
    });
  }

  logoutUser(): void {
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}
