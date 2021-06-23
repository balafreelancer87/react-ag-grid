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

interface AddUserAction {
  type: UsersActionTypes.ADD_USER_REQUEST;
}

interface AddUsersSuccessAction {
  type: UsersActionTypes.ADD_USER_SUCCESS;
  payload: string;
}

interface AddUsersErrorAction {
  type: UsersActionTypes.ADD_USER_ERROR;
  payload: string; 
}

interface ResetUserAction {
  type: UsersActionTypes.RESET_USER_REQUEST;
}

export type UsersActions =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersErrorAction
  | AddUserAction
  | AddUsersSuccessAction
  | AddUsersErrorAction
  | ResetUserAction;