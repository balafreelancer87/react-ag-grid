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
import { hot } from 'react-hot-loader/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import ListUsers from './pages/Users/ListUsers';
import AddUser from './pages/Users/AddUser';
import InfiniteScrollGrid from './pages/InfiniteScroll/InfiniteScrollGrid';
import InfiniteScrollMassGrid from './pages/InfiniteScroll/InfiniteScrollMassGrid';
import ServerSideFullStore from './pages/ServerSide/ServerSideFullStore';
import ServerSideTransactions from './pages/ServerSide/ServerSideTransactions';

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
        <ToastContainer autoClose={3000} />
          <BrowserRouter>
            <Route path={'/'} exact component={Home}/>
            <Route path={'/list-users'} exact component={ListUsers}/>
            <Route path={'/add-user'} exact component={AddUser}/>
            <Route path={'/infinite-scroll'} exact component={InfiniteScrollGrid}/>
            <Route path={'/infinite-scroll-mass'} exact component={InfiniteScrollMassGrid}/>
            <Route path={'/server-side-full-store'} exact component={ServerSideFullStore}/>
            <Route path={'/server-side-transactions'} exact component={ServerSideTransactions}/>
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>      
    );
  }
  
}

export default process.env.NODE_ENV !== "production" ? hot(App) : App
