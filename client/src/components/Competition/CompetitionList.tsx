import React, { useEffect } from 'react'
import './CompetitionList.css';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_COMPETITIONS = gql`
  {
    competitions{
      _id
      title
      description
    }
  }
`;

interface ICompetition {
  _id: string,
  title: string,
  description: string,
}

const CompetitionList:React.FC = () => {
  const [getCompetitions,{ loading, error, data }] = useLazyQuery(GET_COMPETITIONS);

  useEffect(() => {
    getCompetitions();
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ul className="competitions-list">
      {data && data.competitions.map((competition: ICompetition) => {
        return (
        <li key={competition._id} className="competitions-item">
          <div className="competitions-item-data">
            {competition.title}
            {competition.description}
          </div>
          <div className="competitions-item-actions">
            <button className="btn">Cancel</button>
          </div>
        </li>
        );
      })}
    </ul>
  );
}

export default CompetitionList;
