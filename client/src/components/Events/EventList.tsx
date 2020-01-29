import React from 'react';

import EventItem from './EventItem';
import './EventList.css';

const EventList = (props: any) => {
  const eventList = props.events.map((event: any) => {
    return <EventItem 
    key={event._id} 
    eventId={event._id} 
    title={event.title}
    userId={props.authUserId}
    price={event.price}
    date={event.date}
    creatorId={event.creator._id}
    onDetail={props.onViewDetail}
    />
  });

  return<ul className="event-list">
    {eventList}
  </ul>
};

export default EventList;
