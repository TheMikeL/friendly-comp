import React from 'react';

import EntryItem from './EntryItem';
import './Entry.css';

const EntryList = (props: any) => {
  const entryList = props.entries.map((entry: any) => {
    return <EntryItem 
    key={entry._id} 
    entryId={entry._id} 
    title={entry.title}
    userId={props.authUserId}
    date={entry.date}
    creatorId={entry.creator._id}
    onDetail={props.onViewDetail}
    />
  });

  return<ul className="entry-list">
    {entryList}
  </ul>
};

export default EntryList;
