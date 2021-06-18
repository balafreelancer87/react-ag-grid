import React, { Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Home from './pages/Home';
import ListUsers from './pages/ListUsers';


class App extends Component<{}, {}> {

  public render(){
    return (
      <BrowserRouter>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/list-users'} exact component={ListUsers}/>
      </BrowserRouter>
    );
  }
  
}

export default App;
