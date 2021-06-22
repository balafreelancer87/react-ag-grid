import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { RouterState } from "connected-react-router";

import { usersReducer } from "./users/reducer";
import { UsersState } from "./users/actionTypes";

export interface ApplicationState {
  users: UsersState; 
  router: RouterState;
}

export const rootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    router: connectRouter(history)
  });
