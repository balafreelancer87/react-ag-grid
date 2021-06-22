import { UsersActionTypes } from './actionTypes';

interface FetchUsersAction {
  type: UsersActionTypes.FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: string[];
}

interface FetchUsersErrorAction {
  type: UsersActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

export type UsersActions =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersErrorAction;