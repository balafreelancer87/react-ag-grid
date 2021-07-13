import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { RouterState } from "connected-react-router";

import { usersReducer } from "./users/reducer";
import { infiniteScrollReducer } from "./infinitescrollgrid/reducer";
import { infiniteScrollMassReducer } from "./infinitescrollgridmass/reducer";
import { serverSideFullStoreReducer } from "./serversidefullstore/reducer";
import { serverSideTransactionsReducer } from "./serversidetransactions/reducer"

import { UsersState } from "./users/actionTypes";
import { InfiniteScrollState } from "./infinitescrollgrid/actionTypes";
import { InfiniteScrollMassState } from "./infinitescrollgridmass/actionTypes";
import { ServerSideFullStoreState } from "./serversidefullstore/actionTypes";
import { ServerSideTransactionsState } from "./serversidetransactions/actionTypes"

export interface ApplicationState {
  users: UsersState,
  infiniteScroll: InfiniteScrollState,
  infiniteScrollMass: InfiniteScrollMassState,
  serverSideFullStore: ServerSideFullStoreState,
  serverSideTransactions: ServerSideTransactionsState,
  router: RouterState
}

export const rootReducer = (history: History) =>
  combineReducers({
    users: usersReducer,
    infiniteScroll: infiniteScrollReducer,
    infiniteScrollMass: infiniteScrollMassReducer,
    serverSideFullStore: serverSideFullStoreReducer,
    serverSideTransactions: serverSideTransactionsReducer,
    router: connectRouter(history)
  });
