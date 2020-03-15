import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context';

const MainNavigation = () => (
  <AuthContext.Consumer>
    {(context) => {
      return <header className="main-navigation">
          <div className="main-navigation__logo">
            <Link to="/"><h1> GraphQL</h1></Link>
          </div>
          <div className="main-navigation__items">
            <ul>
              {!context.auth.loggedIn && (
                <li>
                  <NavLink to="/auth">Login</NavLink>
                </li>
              )}
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
