/* eslint-disable react/prefer-stateless-function */
import React, { useState, useContext, SyntheticEvent, } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './Pages.css';
import AuthContext from '../context/auth-context';

const LOG_IN = gql `
  query Login($email: String!, $password: String!){
    login(email: $email, password: $password){
      userId
      token
      tokenExpiration
      name
    }
  }
`;

const SIGN_UP = gql`
    mutation CreateUser($firstName: String, $lastName: String, $email: String!, $password: String!){
      createUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}){
        _id
        email
      }
    }
`;

const AuthPage = () => {
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [signUp] = useMutation(SIGN_UP);
  const [signIn, {loading, error, data}] = useLazyQuery(LOG_IN);

  const emailEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const passwordEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const firstNameEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const lastNameEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data && data.login.token){
    authContext.login(
      data.login.userId,
      data.login.token,
      data.login.tokenExpiration,
      data.login.name);
    localStorage.setItem('token', data.login.token);
  }

  const submitHandler = async (entry: SyntheticEvent) => {
    entry.preventDefault();
    let inputEmail = "";
    let inputPassword = "";
    let inputFirstName = "";
    let inputLastName = "";
    if (firstNameEl.current){
      inputFirstName = firstNameEl.current.value;
    }
    if (lastNameEl.current){
      inputLastName = lastNameEl.current.value;
    }
    if (emailEl.current){
      inputEmail = emailEl.current.value;
    }
    if (passwordEl.current){
      inputPassword = passwordEl.current.value;
    }
    if (inputEmail.trim().length === 0 || inputPassword.trim().length === 0){
      return;
    }
    if (isLogin){
      signIn({variables: {
        email: inputEmail,
        password: inputPassword,
      }});
    }else {
      signUp({
        variables: {
        firstName: inputFirstName,
        lastName: inputLastName,
        email: inputEmail,
        password: inputPassword,
      }});
      console.log("User Created!");
    }
  }

  return (
    <form className="auth__form" onSubmit={submitHandler}>
      {!isLogin && <>
        <div className="form-control">
          <label htmlFor="firstName">First Name
            <input type="text" id="firstName" ref={ firstNameEl } />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name
            <input type="text" id="lastName" ref={ lastNameEl } />
          </label>
        </div>
      </> }
      <div className="form-control">
        <label htmlFor="email">E-mail
          <input type="email" id="email" ref={ emailEl } />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="password">Password
          <input type="password" id="password" ref={ passwordEl } />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" >Submit</button>
        <button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Sign Up' : 'Login'}</button>
      </div>
    </form>
  );
}

export default AuthPage;
