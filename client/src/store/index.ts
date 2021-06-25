import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { RouterState } from "connected-react-router";

import { usersReducer } from "./users/reducer";
import { infiniteScrollReducer } from "./infinitescrollgrid/reducer";

import { UsersState } from "./users/actionTypes";
import { InfiniteScrollState } from "./infinitescrollgrid/actionTypes";

export interface ApplicationState {
  users: UsersState;
  infiniteScroll: InfiniteScrollState; 
  router: RouterState;
}

export const rootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    infiniteScroll: infiniteScrollReducer,
    router: connectRouter(history)
  });
