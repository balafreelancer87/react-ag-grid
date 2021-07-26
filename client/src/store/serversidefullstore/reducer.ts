// import { Reducer } from 'redux'
import { ServerSideFullStoreState, ServerSideFullStoreActionTypes } from './actionTypes'
import { ServerSideFullStoreActions } from './actions';

export const initialState: ServerSideFullStoreState = {
  data: [],
  errors: null,
  loading: false,
  message: null,
  updateData: []
}

export const serverSideFullStoreReducer = (state: ServerSideFullStoreState = initialState, action: ServerSideFullStoreActions): ServerSideFullStoreState => {
  switch (action.type) {
    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_REQUEST: {
      return { ...state, loading: true }
    }
    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }

    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_REQUEST: {
      return { ...state, loading: true }
    }
    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_SUCCESS: {
      return { ...state, loading: false, updateData: action.payload }
    }
    case ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
  
    default: {
      return state;
    }
  }
}


