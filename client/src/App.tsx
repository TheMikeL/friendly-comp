import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

// eslint-disable-next-line import/extensions
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';

import AuthContext from './context/auth-context';


import './App.css';



class App extends Component<any,any> {
  state = {
    token: null,
    userId: null,
  }
  login = (userId: any, token: any, tokenExpiration: any) =>{
    this.setState({token: token, userId: userId});
  }
  logout = () =>{
    this.setState({token: null, userId: null});
  }
  
  render(){
    const defaultValues = {
      token: this.state.token,
      userId: this.state.userId,
      login: this.login,
      logout: this.logout,
    }
    return (<BrowserRouter>
      <>
        <AuthContext.Provider value = {defaultValues}>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {this.state.token && <Redirect from="/" to="/events" exact />}
              {this.state.token && <Redirect from="/auth" to="/events" exact />}
              {!this.state.token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventsPage} />
              {this.state.token && <Route path="/bookings" component={BookingsPage} />}
              {!this.state.token && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
    );
  };
};

export default App;
