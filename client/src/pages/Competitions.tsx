/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import CompetitionList from '../components/Competition/CompetitionList';
import JoinCompetition from '../components/Competition/JoinCompetition';

interface State {
  isLoading: boolean,
  competitions?: [],
}

const CompetitionsPage = (props: any,state: State) => {
  const [isLoading, setIsLoading] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const authContext = useContext(AuthContext);
  console.log(props);

  const titleEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const passwordEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const descriptionEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  
  const createCompetition = async (competition: SyntheticEvent) => {
    competition.preventDefault();
    let inputTitle = "";
    let inputPassword = "";
    let inputDescription = "";
    if (titleEl.current){
      inputTitle = titleEl.current.value;
    }
    if (passwordEl.current){
      inputPassword = passwordEl.current.value;
    }
    if (descriptionEl.current){
      inputDescription = descriptionEl.current.value;
    }
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CreateCompetition($title: String!, $password: String!, $description: String){
          createCompetition(competitionInput:{title: $title, password: $password, description: $description}){
            _id
            title
            description
          }
        }
      `,
      variables: {
        title: inputTitle,
        description: inputDescription,
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
        const competitions = resData.data.competitions;
        console.log(resData);
        setCompetitions(competitions);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <form className="auth-form" onSubmit={createCompetition}>
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
        <div className="form-control">
          <label htmlFor="description">Description
            <input type="description" id="description" ref={ descriptionEl } />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" >Submit</button>
          {/* <button type="button" onClick={switchModeHandler}>Switch to {isLogin ? 'Sign Up' : 'Login'}</button> */}
        </div>
      </form>
      <JoinCompetition history={props.history}/>
    </>
    // <>{isLoading ? <Spinner /> :
    //   <CompetitionList 
    //     competitions={competitions}
    //     // onDelete={deleteCompetitionHandler}
    //   />
    // }
    // </>
  );
}

export default CompetitionsPage;
