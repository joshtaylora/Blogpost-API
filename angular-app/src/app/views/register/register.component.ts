import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  emailAddress = '';
  userId = '';
  password = '';

  userInfo: {
    userId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  } | null = null;

  user: User | null = null;

  message = '';

  success = false;

  constructor(private userService: UserService, private router: Router) {
    this.userInfo = {
      userId: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.success = true;
  }

  changeAlert(): void {
    this.success = false;
    this.message = 'An error has occurred';
  }

  LoginNewUser(): void {
    this.userService
      .Login(this.userInfo?.userId, this?.userInfo.password)
      .subscribe(
        (loginResponse) => {
          this.success = true;
          this.userService.SetUserLoggedIn(loginResponse);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.success = false;
          this.message = error.message;
          console.log(JSON.stringify(error.message));
        }
      );
  }

  CreateUser(): void {
    if (this.userInfo !== null) {
      let response = this.userService.CreateUser(this.userInfo).subscribe(
        (registerResponse) => {
          this.success = true;
          this.LoginNewUser();
        },
        (error) => {
          this.success = false;
          this.message = error.message;
        }
      );
    }
  }
}
