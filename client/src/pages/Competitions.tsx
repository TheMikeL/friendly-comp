/* eslint-disable react/prefer-stateless-function */
import React, { useState, useContext } from 'react';
import JoinCompetition from '../components/Competition/JoinCompetition';
import CreateCompetition from '../components/Competition/CreateCompetition';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CompetitionList from '../components/Competition/CompetitionList';
import AuthContext from '../context/auth-context';


const CompetitionsPage = (props: any) => {
  const authContext = useContext(AuthContext);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      Hello {authContext.auth.name}
      Competitions
      <CompetitionList/>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Create" />
        <Tab label="Join" />
      </Tabs>
      {value 
        ? <JoinCompetition history={props.history}/>
        : <CreateCompetition />
      }
    </>
  );
}

export default CompetitionsPage;
