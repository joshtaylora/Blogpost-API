import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  userId: string = '';
  password: string = '';

  userInfo: { userId: string, firstName: string, lastName: string, emailAddress:string, password: string}|null = null;

  user:User|null = null

  message:string = '';

  success:boolean = false;


  constructor(private userService: UserService) {
    this.userInfo = { userId: '', firstName: '', lastName: '', emailAddress: '', password: ''}
  }


  ngOnInit(): void {
    this.success = true;
  }

  changeAlert(): void {
    this.success = false;
    this.message = 'An error has occurred';
  }

  // CreateUser(): void {
  //   if (this.user !== null) {
  //     this.userService.CreateUser(this.userInfo);
  //   }
  // }

  onSubmit(): void {

    if (this.userInfo !== null) {
      this.userService.CreateUser(this.userInfo);
    }
  }
}
