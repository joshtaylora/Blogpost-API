import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userAuthInfo: { userName: string; password: string } | null = null;
  message: string = '';
  success: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    this.userAuthInfo = { userName: '', password: '' };
  }

  ngOnInit(): void {}

  LoginUser(): void {
    if (
      this.userAuthInfo?.userName !== undefined &&
      this.userAuthInfo.password !== undefined
    ) {
      this.userService
        .Login(this.userAuthInfo?.userName, this.userAuthInfo?.password)
        .subscribe(
          (response) => {
            this.success = true;
            this.userService.SetUserLoggedIn(response);
            this.router.navigate(['/home']);
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
