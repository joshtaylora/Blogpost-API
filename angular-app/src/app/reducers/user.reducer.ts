import { Action } from '@ngrx/store';
import { User } from '@users/models/user.model';
import * as UserActions from 'src/app/actions/user.actions';

export function reducer(state: User[], action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.ADD_USER:
      return [...state, action.payload];
    default:
      return state;
  }
}
