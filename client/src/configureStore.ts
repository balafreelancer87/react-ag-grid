import { Store, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import logger from 'redux-logger'

import { ApplicationState, rootReducer } from "./store";

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), logger, thunk))
  );
  
  return store;
}
