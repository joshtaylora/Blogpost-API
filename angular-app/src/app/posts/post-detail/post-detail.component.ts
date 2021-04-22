import { Component, OnInit, Input } from '@angular/core';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { Editor } from 'ngx-editor';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post | undefined;
  @Input() showMenu: boolean;
  @Input() isEditable: boolean;
  editor: Editor;
  faDeletePostIcon = faRecycle;
  userLoggedIn: boolean;
  loggedInUser: User;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.getLoggedInUser();
    if (this.showMenu === undefined || this.showMenu === null) {
      this.showMenu = false;
    }
    if (this.isEditable === undefined || this.isEditable === null) {
      this.isEditable = false;
    }
  }

  private getLoggedInUser(): void {
    // grab the user token from the user service
    const userToken = this.userSvc.getLoggedInUser();
    // check to ensure that a valid token was returned
    if (userToken !== null && userToken.UserData !== undefined) {
      this.loggedInUser = userToken.UserData as User;
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

}
