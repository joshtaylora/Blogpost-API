import { Component, OnInit } from '@angular/core';
import { UserService } from '@users/services/user.service';

@Component({
  selector: 'app-users-card-list',
  templateUrl: './users-card-list.component.html',
  styleUrls: ['./users-card-list.component.css'],
})
export class UsersCardListComponent implements OnInit {
  constructor(private usersService: UserService) {}

  ngOnInit(): void {}
}
