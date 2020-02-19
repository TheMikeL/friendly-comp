import React, { SyntheticEvent } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IRouterProps extends RouteComponentProps<any> {
}

const JOIN_COMPETITION = gql`
  query JoinCompetition($title: String!, $password: String!){
    joinCompetition(title: $title, password: $password){
      _id
      title
      description
    }
  }
`;

const JoinCompetition:React.FC<IRouterProps> = ({history}) => {
  let inputTitle = "";
  let inputPassword = "";
  const [joinCompetition, {loading, error, data}] = useLazyQuery(JOIN_COMPETITION); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data && data.joinCompetition){
    history.push({
      pathname:`/competitions/${data.joinCompetition.title}`,
      state: { detail: data.joinCompetition},
    });
  }
  const titleEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const passwordEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const findCompetition = async (competition: SyntheticEvent) => {
    competition.preventDefault();
    
    if (titleEl.current){
      inputTitle = titleEl.current.value;
    }
    if (passwordEl.current){
      inputPassword = passwordEl.current.value;
    }
    joinCompetition({variables: {
      title: inputTitle,
      password: inputPassword,
    }});
  };
  return (
    <>
      <form className="auth__form" onSubmit={findCompetition}>
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

export default withRouter(JoinCompetition);
