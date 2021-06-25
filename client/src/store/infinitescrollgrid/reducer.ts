// import { Reducer } from 'redux'
import { InfiniteScrollState, InfiniteScrollActionTypes } from './actionTypes'
import { InfiniteScrollActions } from './actions';

export const initialState: InfiniteScrollState = {
  data: [],
  errors: null,
  loading: false,
  message: null
}

export const infiniteScrollReducer = (state: InfiniteScrollState = initialState, action: InfiniteScrollActions): InfiniteScrollState => {
  switch (action.type) {
    case InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_REQUEST: {
      return { ...state, loading: true }
    }
    case InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case InfiniteScrollActionTypes.FETCH_INFINITE_SCROLL_DATA_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
  
    default: {
      return state;
    }
  }
}


