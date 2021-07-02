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
          {/* <li className="nav-item">
            <NavLink to={'/list-users'} className="nav-link">
              List Users
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to={'/add-user'} className="nav-link">
              Add User
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/infinite-scroll'} className="nav-link">
              Infinite Scroll
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/infinite-scroll-mass'} className="nav-link">
              Infinite Scroll Mass
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to={'/infinite-scroll-server'} className="nav-link">
              Infinite Scroll Server
            </NavLink>
          </li> */}
        </ul>
      
      </nav> 
    );
  }
  
}

export default Nav;
