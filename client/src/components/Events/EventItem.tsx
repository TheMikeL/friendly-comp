import React from 'react';

import './EventItem.css';

const EventItem = (props: any) => (
  <li key={props.eventId} className="event-list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>${parseFloat(props.price)} - {new Date(props.date).toLocaleDateString()}</h2>
    </div>

    <div>
      {props.userId === props.creatorId
      ? <p> You're the owner of the event.</p>
      : <button className="btn" onClick={() => props.onDetail(props.eventId)}> View Details</button> }
    </div>
  </li>
);

export default EventItem;
