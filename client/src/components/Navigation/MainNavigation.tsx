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
            {!context.token && (
              <li>
                <NavLink to="/auth">Authenticate</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            {context.token && (
              <>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
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
