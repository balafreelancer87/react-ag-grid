import { InfiniteScrollActionTypes } from './actionTypes';

interface FetchInfiniteScrollAction {
  type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_REQUEST;
}

interface FetchInfiniteScrollSuccessAction {
  type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_SUCCESS;
  payload: string[];
}

interface FetchInfiniteScrollErrorAction {
  type: InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_ERROR;
  payload: string;
}



export type InfiniteScrollActions =
  | FetchInfiniteScrollAction
  | FetchInfiniteScrollSuccessAction
  | FetchInfiniteScrollErrorAction;