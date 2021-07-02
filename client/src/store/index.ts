import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { RouterState } from "connected-react-router";

import { usersReducer } from "./users/reducer";
import { infiniteScrollReducer } from "./infinitescrollgrid/reducer";
import { infiniteScrollMassReducer } from "./infinitescrollgridmass/reducer";

import { UsersState } from "./users/actionTypes";
import { InfiniteScrollState } from "./infinitescrollgrid/actionTypes";
import { InfiniteScrollMassState } from "./infinitescrollgridmass/actionTypes";

export interface ApplicationState {
  users: UsersState,
  infiniteScroll: InfiniteScrollState,
  infiniteScrollMass: InfiniteScrollMassState,
  router: RouterState
}

export const rootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    infiniteScroll: infiniteScrollReducer,
    infiniteScrollMass: infiniteScrollMassReducer,
    router: connectRouter(history)
  });
