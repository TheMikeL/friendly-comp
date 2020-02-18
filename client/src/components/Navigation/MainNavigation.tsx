import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import AuthContext from '../../context/auth-context';

const MainNavigation = () => (
  <AuthContext.Consumer>
    {(context) => {
      return <header className="main-navigation">
        <div className="main-navigation-logo">
          <h1> GraphQL</h1>
        </div>
        <div className="main-navigation-items">
          <ul>
            {/* FOR LATER USE
            {!context.auth.loggedIn && (
              <li>
                <NavLink to="/auth">Authenticate</NavLink>
              </li>
            )} */}
            
            {context.auth.loggedIn && (
              <>
                <li>
                  <NavLink to="/competitions">Competitions</NavLink>
                </li>
                <li>
                  <button onClick={context.logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
