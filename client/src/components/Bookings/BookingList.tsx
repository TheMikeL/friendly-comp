import React from 'react'
import './BookingList.css';

const BookingList =(props: any) => {
  return (
    <ul className="bookings-list">
      {props.bookings.map((booking: any) => {
        return (
        <li key={booking._id} className="bookings-item">
          <div className="bookings-item-data">
            {booking.event.title} - {' '}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="bookings-item-actions">
            <button className="btn" onClick={() => props.onDelete(booking._id)}>Cancel</button>
          </div>
        </li>
        );
      })}
    </ul>
  );
}

export default BookingList
