// This file holds our state type, as well as any other types related to this Redux store.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum UsersActionTypes {
  FETCH_USERS_REQUEST = '@@users/FETCH_REQUEST',
  FETCH_USERS_SUCCESS = '@@users/FETCH_SUCCESS',
  FETCH_USERS_ERROR = '@@users/FETCH_ERROR'
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Response object for GET /users
export interface User extends ApiResponse {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: number,
  address: string,
  description: string,
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UsersState {
  readonly loading: boolean
  readonly data: User[] | string[]
  readonly errors?: string | null
}
