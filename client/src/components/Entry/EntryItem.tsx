import React from 'react';

import './Entry.css';

const EntryItem = (props: any) => (
  <li key={props.entryId} className="entry-list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>{new Date(props.date).toLocaleDateString()}</h2>
    </div>

    <div>
      {props.userId === props.creatorId
      ? <p> You're the owner of the entry.</p>
      : <button className="btn" onClick={() => props.onDetail(props.entryId)}> View Details</button> }
    </div>
  </li>
);

export default EntryItem;
