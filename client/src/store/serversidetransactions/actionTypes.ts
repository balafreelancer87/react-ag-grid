// This file holds our state type, as well as any other types related to this Redux store.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum ServerSideTransactionsActionTypes { 
  SERVER_SIDE_TRANSACTIONS_DATA_REQUEST = '@@server_side_transactions_data/FETCH_REQUEST',
  SERVER_SIDE_TRANSACTIONS_DATA_SUCCESS = '@@server_side_transactions_data/FETCH_SUCCESS',
  SERVER_SIDE_TRANSACTIONS_DATA_ERROR = '@@server_side_transactions_data/FETCH_ERROR'
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Response object for GET
export interface ServerSideTransactionsData extends ApiResponse {
  [key: string]: any;
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ServerSideTransactionsState {
  readonly loading: boolean
  readonly data: ServerSideTransactionsData[] | string[] | any
  readonly errors?: string | null
  readonly message?: string | null
}
