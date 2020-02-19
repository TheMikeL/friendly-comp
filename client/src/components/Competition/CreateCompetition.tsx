import React, { SyntheticEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATE_COMPETITION = gql `
  mutation CreateCompetition($title: String!, $password: String!, $description: String){
    createCompetition(competitionInput:{title: $title, password: $password, description: $description}){
      _id
      title
      description
    }
  }
`;

const CreateCompetition:React.FC = () => {
  const [createCompetition] = useMutation(CREATE_COMPETITION);

  const titleEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const passwordEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const descriptionEl: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  
  const createCompetitionHandler = async (competition: SyntheticEvent) => {
    competition.preventDefault();
    let inputTitle: string = "";
    let inputPassword: string = "";
    let inputDescription: string = "";
    if (titleEl.current){
      inputTitle = titleEl.current.value;
    }
    if (passwordEl.current){
      inputPassword = passwordEl.current.value;
    }
    if (descriptionEl.current){
      inputDescription = descriptionEl.current.value;
    }
    createCompetition({
      variables: {
      title: inputTitle,
      description: inputDescription,
      password: inputPassword,
    }});
  };
  return (
    <form className="auth__form" onSubmit={createCompetitionHandler}>
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
        </div>
      </form>
  )
}

export default CreateCompetition;
