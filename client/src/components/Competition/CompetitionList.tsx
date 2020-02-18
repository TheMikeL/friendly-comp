import React, { useEffect } from 'react'
import './CompetitionList.css';
import { useQuery } from '@apollo/react-hooks';
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

const CompetitionList = (props: any) => {
  const { loading, error, data, refetch } = useQuery(GET_COMPETITIONS);

  useEffect(() => {
    refetch();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ul className="competitions-list">
      {data.competitions.map((competition: any) => {
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
