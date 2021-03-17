import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  title = 'angular-app';
  // imported the service 
  constructor(private service: UsersService) {

  }
  ngOnInit() {
    this.getUsersFromAPI();
  }
  getUsersFromAPI() {
    
  }
}