import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';


interface MenuState { 

}

class Nav extends Component<{}, MenuState> {

  public render(){
    return (
      <nav className="navbar navbar-expand-sm bg-light">          
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={'/'} exact className="nav-link">
                Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/list-users'} className="nav-link">
                Users List
            </NavLink>
          </li>
        </ul>
      
      </nav> 
    );
  }
  
}

export default Nav;
