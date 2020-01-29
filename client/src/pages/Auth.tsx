/* eslint-disable react/prefer-stateless-function */
import React, { Component, SyntheticEvent } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component<any, any> {
  emailEl: React.RefObject<HTMLInputElement>;
  passwordEl: React.RefObject<HTMLInputElement>;

  state = {
    isLogin: true,
  }

  static contextType =  AuthContext;

  constructor(props: any){
    super(props);
    this.emailEl = React.createRef<HTMLInputElement>();
    this.passwordEl = React.createRef<HTMLInputElement>();
  }

  switchModeHandler = () => {
    this.setState((prevState: any) => {
      return {isLogin: !prevState.isLogin}
    });
  }
  submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    let inputEmail = "";
    let inputPassword = "";
    if (this.emailEl.current){
      inputEmail = this.emailEl.current.value;
    }
    if (this.passwordEl.current){
      inputPassword = this.passwordEl.current.value;
    }
    if (inputEmail.trim().length === 0 || inputPassword.trim().length === 0){
      return;
    }
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: inputEmail,
        password: inputPassword,
      }
    };

    if(!this.state.isLogin){
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!){
            createUser(userInput: {email: $email, password: $password}){
              _id
              email
            }
          }
        `,
        variables: {
          email: inputEmail,
          password: inputPassword,
        }
      };
    }
    
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res);
      if (res.status !== 200 && res.status !== 201){
        throw new Error('Failed!');
      }
        return res.json();
    }).then((resData) => {
      if (resData.data.login.token){
        this.context.login(
          resData.data.login.userId,
          resData.data.login.token,
          resData.data.login.tokenExpiration);
      }
      console.log(resData);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" ref={ this.emailEl } />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={ this.passwordEl } />
        </div>
        <div className="form-actions">
          <button type="submit" >Submit</button>
          <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Sign Up' : 'Login'}</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
