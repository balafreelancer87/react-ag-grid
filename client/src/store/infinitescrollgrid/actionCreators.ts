import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { toast } from 'react-toastify';

import { InfiniteScrollActionTypes } from "./actionTypes";
import { InfiniteScrollActions } from "./actions";

import { ApplicationState } from "../index";
import axios from 'axios';

export type AppThunk = ThunkAction<Promise<any>,
  ApplicationState,
  null,
  InfiniteScrollActions
>;

export const fetchInfiniteScrollRequest: ActionCreator<AppThunk> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_REQUEST,
    });
    try {
      const users = await axios
        .get(`https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json`)
        .then(res => res.data);

      return dispatch({
        type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_SUCCESS,
        payload: users
      });
    } catch (err) {
      return dispatch({
        type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_ERROR,
        payload: "Error in Fetching data"
      });
    }
  };
};

