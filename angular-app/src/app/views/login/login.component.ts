import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userAuthInfo: { userName: string; password: string } | null = null;
  message: string = '';
  success: boolean = false;

  constructor(private userSvc: UsersService, private router: Router) {
    this.userAuthInfo = { userName: '', password: '' };
  }

  ngOnInit(): void {}
  loginUser(): void {
    if (
      this.userAuthInfo?.userName !== undefined &&
      this.userAuthInfo?.password !== undefined
    ) {
      const result = this.userSvc.login(
        this.userAuthInfo.userName,
        this.userAuthInfo.password
      );
      if (result) {
        this.success = true;
        this.message = 'You have been successfully logged in';
        setTimeout(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.success = false;
        this.message = 'Error, the username and password were not correct';
      }
    }
  }
}
