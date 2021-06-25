import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { toast } from 'react-toastify';

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

export const addUserRequest: ActionCreator<AppThunk> = (formData) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UsersActionTypes.ADD_USER_REQUEST,
    });
    try {
      const result = await axios
        .post(`http://localhost:5000/users`, formData)
        .then(res => res.data);
        toast.success("User added Successfully!!!", {
          position: toast.POSITION.TOP_CENTER
        });
        
      return dispatch({
        type: UsersActionTypes.ADD_USER_SUCCESS,
        payload: "success"
      });
    } catch (err) {
      toast.error("User adding failed!!!", {
        position: toast.POSITION.TOP_LEFT
      });
      return dispatch({
        type: UsersActionTypes.ADD_USER_ERROR,
        payload: "fail"
      });
    }
  };
};

export const resetUsersRequest: ActionCreator<AppThunk> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: UsersActionTypes.RESET_USER_REQUEST,
    }); 
  };
};