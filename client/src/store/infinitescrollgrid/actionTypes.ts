// This file holds our state type, as well as any other types related to this Redux store.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum InfiniteScrollActionTypes { 
  FETCH_INFINITE_SCROLL_DATA_REQUEST = '@@infinite_scroll_data/FETCH_REQUEST',
  FETCH_INFINITE_SCROLL_DATA_SUCCESS = '@@infinite_scroll_data/FETCH_SUCCESS',
  FETCH_INFINITE_SCROLL_DATA_ERROR = '@@infinite_scroll_data/FETCH_ERROR'
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Response object for GET
export interface InfiniteScrollData extends ApiResponse {
  [key: string]: any;
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface InfiniteScrollState {
  readonly loading: boolean
  readonly data: InfiniteScrollData[] | string[]
  readonly errors?: string | null
  readonly message?: string | null
}
