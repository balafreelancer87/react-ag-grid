import { ServerSideFullStoreActionTypes } from './actionTypes';

interface ServerSideFullStoreAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_REQUEST;
}

interface ServerSideFullStoreSuccessAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_SUCCESS;
  payload: string[];
}

interface ServerSideFullStoreErrorAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_DATA_ERROR;
  payload: string;
}

interface ServerSideFullStoreUpdateAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_REQUEST;
}

interface ServerSideFullStoreUpdateSuccessAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_SUCCESS;
  payload: string[];
}

interface ServerSideFullStoreUpdateErrorAction {
  type: ServerSideFullStoreActionTypes.SERVER_SIDE_FULLSTORE_UPDATE_ERROR;
  payload: string;
}



export type ServerSideFullStoreActions =
  | ServerSideFullStoreAction
  | ServerSideFullStoreSuccessAction
  | ServerSideFullStoreErrorAction
  | ServerSideFullStoreUpdateAction
  | ServerSideFullStoreUpdateSuccessAction
  | ServerSideFullStoreUpdateErrorAction;