import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@users/services/user.service';
import { AuthTokenStore } from '@services/auth/auth-token.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userAuthInfo: { userName: string; password: string } | null = null;
  message = '';
  success = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthTokenStore
  ) {
    this.userAuthInfo = { userName: '', password: '' };
  }

  ngOnInit(): void {}

  LoginUser(): void {
    if (
      this.userAuthInfo?.userName !== undefined &&
      this.userAuthInfo.password !== undefined
    ) {
      this.auth
        .loginUser(this.userAuthInfo?.userName, this.userAuthInfo?.password)
        .subscribe(
          (token) => {
            console.log(token)
            this.success = true;
            this.router.navigate(['/users', 'posts', this.userAuthInfo.userName]);
          },
          (error) => {
            this.success = false;
            this.message = error.message;
            console.log(JSON.stringify(error.message));
          }
        );
    }
  }

  onSubmit(): void {}
}
