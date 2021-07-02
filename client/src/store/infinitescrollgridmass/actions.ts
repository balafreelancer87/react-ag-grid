import { InfiniteScrollMassActionTypes } from './actionTypes';

interface FetchInfiniteScrollMassAction {
  type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_REQUEST;
}

interface FetchInfiniteScrollMassSuccessAction {
  type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_SUCCESS;
  payload: string[];
}

interface FetchInfiniteScrollMassErrorAction {
  type: InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_ERROR;
  payload: string;
}



export type InfiniteScrollMassActions =
  | FetchInfiniteScrollMassAction
  | FetchInfiniteScrollMassSuccessAction
  | FetchInfiniteScrollMassErrorAction;