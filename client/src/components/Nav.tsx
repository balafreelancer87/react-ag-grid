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
          {/* <li className="nav-item">
            <NavLink to={'/add-user'} className="nav-link">
              Add User
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to={'/infinite-scroll'} className="nav-link">
              Infinite Scroll
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/infinite-scroll-mass'} className="nav-link">
              Infinite Scroll Mass 500k
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/server-side-full-store'} className="nav-link">
              Server Side Full Store
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/server-side-transactions'} className="nav-link">
              Server Side Transactions
            </NavLink>
          </li>
        </ul>
      
      </nav> 
    );
  }
  
}

export default Nav;
