// import { Reducer } from 'redux'
import { InfiniteScrollMassState, InfiniteScrollMassActionTypes } from './actionTypes'
import { InfiniteScrollMassActions } from './actions';

export const initialState: InfiniteScrollMassState = {
  data: [],
  errors: null,
  loading: false,
  message: null
}

export const infiniteScrollMassReducer = (state: InfiniteScrollMassState = initialState, action: InfiniteScrollMassActions): InfiniteScrollMassState => {
  switch (action.type) {
    case InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_REQUEST: {
      return { ...state, loading: true }
    }
    case InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case InfiniteScrollMassActionTypes.FETCH_INFINITE_SCROLL_MASS_DATA_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
  
    default: {
      return state;
    }
  }
}


