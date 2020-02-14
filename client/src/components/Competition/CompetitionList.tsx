import React from 'react'
import './CompetitionList.css';

const CompetitionList = (props: any) => {
  return (
    <ul className="competitions-list">
      {props.competitions.map((competition: any) => {
        return (
        <li key={competition._id} className="competitions-item">
          <div className="competitions-item-data">
            {competition.entry.title} - {' '}
            {new Date(competition.createdAt).toLocaleDateString()}
          </div>
          <div className="competitions-item-actions">
            <button className="btn" onClick={() => props.onDelete(competition._id)}>Cancel</button>
          </div>
        </li>
        );
      })}
    </ul>
  );
}

export default CompetitionList;
