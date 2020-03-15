import React, { useState } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import AuthPage from './pages/Authentication/Auth';
import CompetitionsPage from './pages/Competition/Competition';
import HomePage from './pages/Home/Home';
import MainNavigation from './components/Navigation/MainNavigation';

import AuthContext from './context/auth-context';

import './App.css';
import SelectedCompetition from './components/Competition/SelectedCompetition';

interface IUserAuth {
    loggedIn: boolean,
    userId: string,
    token: string,
    tokenExpiration: number,
    name: string,
}
const App: React.FC = () => {
  const [auth, setAuth] = useState<IUserAuth>({
    loggedIn: false,
    userId: "",
    token: "",
    tokenExpiration: 0,
    name: "",
  });

  const { loggedIn } = auth;

  const login = (userId: string, token: string, tokenExpiration: number, name: string) =>{
    setAuth({
      loggedIn: true,
      userId: userId,
      token: token,
      tokenExpiration: tokenExpiration,
      name: name,
    })
  }
  const logout = () =>{
    setAuth({
      loggedIn: false,
      userId: "",
      token: "",
      tokenExpiration: 0,
      name: "",
    })
  }

  const defaultValues = {
    auth: auth,
    login: login,
    logout: logout,
  }
  return (<BrowserRouter>
    <>
      <AuthContext.Provider value={defaultValues}>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            {!loggedIn && <Route path="/" component={HomePage} exact />}
            {loggedIn && <Redirect from="/auth" to="/competitions" exact />}
            {!loggedIn && <Route path="/auth" component={AuthPage} />}
            {loggedIn && <Route path="/competitions" component={CompetitionsPage} exact/>}
            {loggedIn && <Route path="/competitions/:title" component={SelectedCompetition} />}
            {!loggedIn && <Redirect to="/auth" exact />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </>
  </BrowserRouter>
  );
};

export default App;
