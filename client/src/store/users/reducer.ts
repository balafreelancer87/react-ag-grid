// import { Reducer } from 'redux'
import { UsersState, UsersActionTypes } from './actionTypes'
import { UsersActions } from './actions';

export const initialState: UsersState = {
  data: [],
  errors: null,
  loading: false
}

export const usersReducer = (state: UsersState = initialState, action: UsersActions): UsersState => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_REQUEST: {
      return { ...state, loading: true }
    }
    case UsersActionTypes.FETCH_USERS_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case UsersActionTypes.FETCH_USERS_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}


