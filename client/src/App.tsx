import React, { Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// redux
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { Store } from "redux";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { hot } from 'react-hot-loader/root'

import Home from './pages/Home';
import ListUsers from './pages/Users/ListUsers';

interface AppProps {
  store: Store<ApplicationState>;
  history: History;
}

class App extends Component<AppProps, {}> {

  public render(){
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/list-users'} exact component={ListUsers}/>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>      
    );
  }
  
}

export default process.env.NODE_ENV !== "production" ? hot(App) : App
