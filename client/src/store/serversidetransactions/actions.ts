import { ServerSideTransactionsActionTypes } from './actionTypes';

interface ServerSideTransactionsAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_REQUEST;
}

interface ServerSideTransactionsSuccessAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_SUCCESS;
  payload: string[];
}

interface ServerSideTransactionsErrorAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_DATA_ERROR;
  payload: string;
}

interface ServerSideUpdateAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_REQUEST;
}

interface ServerSideUpdateSuccessAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_SUCCESS;
  payload: string[];
}

interface ServerSideUpdateErrorAction {
  type: ServerSideTransactionsActionTypes.SERVER_SIDE_TRANSACTIONS_UPDATE_ERROR;
  payload: string;
}


export type ServerSideTransactionsActions =
  | ServerSideTransactionsAction
  | ServerSideTransactionsSuccessAction
  | ServerSideTransactionsErrorAction
  | ServerSideUpdateAction
  | ServerSideUpdateSuccessAction
  | ServerSideUpdateErrorAction