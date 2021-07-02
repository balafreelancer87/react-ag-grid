import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { toast } from 'react-toastify';

import { InfiniteScrollMassActionTypes } from "./actionTypes";
import { InfiniteScrollMassActions } from "./actions";

import { ApplicationState } from "../index";
import axios from 'axios';

export type AppThunk = ThunkAction<Promise<any>,
  ApplicationState,
  null,
  InfiniteScrollMassActions
>;

export const fetchInfiniteScrollMassRequest: ActionCreator<AppThunk> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_REQUEST,
    });
    try {
      const response = await axios
        .get(`http://localhost:5000/transactions`)
        .then(res => res.data);

      return dispatch({
        type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_SUCCESS,
        payload: response
      });
    } catch (err) {
      return dispatch({
        type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_ERROR,
        payload: "Error in Fetching data"
      });
    }
  };
};

