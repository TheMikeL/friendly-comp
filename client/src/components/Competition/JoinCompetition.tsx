import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import AuthContext from '../../context/auth-context';
import { Route } from 'react-router-dom';
import SelectedCompetition from './SelectedCompetition';

const JoinCompetition = (props: any) => {
  const authContext = useContext(AuthContext);
  console.log(props);
  const titleEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const passwordEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const joinCompetition = async (competition: SyntheticEvent) => {
    competition.preventDefault();
    let inputTitle = "";
    let inputPassword = "";
    if (titleEl.current){
      inputTitle = titleEl.current.value;
    }
    if (passwordEl.current){
      inputPassword = passwordEl.current.value;
    }
    const requestBody = {
      query: `
        query JoinCompetition($title: String!, $password: String!){
          joinCompetition(title: $title, password: $password){
            _id
            title
            description
          }
        }
      `,
      variables: {
        title: inputTitle,
        password: inputPassword,
      }
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authContext.auth.token,
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        props.history.push({
          pathname:`/competitions/${resData.data.joinCompetition.title}`,
          state: { detail: resData.data.joinCompetition},
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <form className="auth-form" onSubmit={joinCompetition}>
        <div className="form-control">
          <label htmlFor="title">Title
            <input type="text" id="title" ref={ titleEl } />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="password">Code
            <input type="password" id="password" ref={ passwordEl } />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" >Submit</button>
          {/* <button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Sign Up' : 'Login'}</button> */}
        </div>
      </form>
    </>
  )
}

export default JoinCompetition;
