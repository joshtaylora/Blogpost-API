import { User } from './user.model';

export class Token {
  UserData:User;
  exp:number;
  iat:number;
  sub:string;
  constructor(
    UserData:User,
    exp:number,
    iat:number,
    sub:string
  ) {
    this.UserData = UserData;
    this.exp = exp;
    this.iat = iat;
    this.sub = sub;
  }
}
