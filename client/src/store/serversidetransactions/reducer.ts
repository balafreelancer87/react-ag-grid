// import { Reducer } from 'redux'
import { ServerSideTransactionsState, ServerSideTransactionsActionTypes } from './actionTypes'
import { ServerSideTransactionsActions } from './actions';

export const initialState: ServerSideTransactionsState = {
  data: [],
  errors: null,
  loading: false,
  message: null
}

export const serverSideTransactionsReducer = (state: ServerSideTransactionsState = initialState, action: ServerSideTransactionsActions): ServerSideTransactionsState => {
  switch (action.type) {
    case ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_REQUEST: {
      return { ...state, loading: true }
    }
    case ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
  
    default: {
      return state;
    }
  }
}


