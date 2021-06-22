import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { UsersActionTypes } from "./actionTypes";
import { UsersActions } from "./actions";

import { ApplicationState } from "../index";
import axios from 'axios';

export type AppThunk = ThunkAction<Promise<any>,
  ApplicationState,
  null,
  UsersActions
>;

export const fetchUsersRequest: ActionCreator<AppThunk> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UsersActionTypes.FETCH_USERS_REQUEST,
    });
    try {
      const users = await axios
        .get(`http://localhost:5000/users`)
        .then(res => res.data);

      return dispatch({
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: users
      });
    } catch (err) {
      return dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Error in Fetch Users List"
      });
    }
  };
};