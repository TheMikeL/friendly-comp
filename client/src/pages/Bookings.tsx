/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList';

class BookingsPage extends Component<{},{isLoading: boolean, bookings?: any}> {
  state:{isLoading: boolean, bookings?:any} = { 
    isLoading: false,
    bookings: [],
  };

  static contextType = AuthContext; 

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          bookings{
            _id
            createdAt
            event{
              _id
              title
              date
            }
          }
        }
      `
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' +this.context.token,
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  deleteBookingHandler = (bookingId: any) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!){
          cancelBooking(bookingId: $id){
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId,
      }
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' +this.context.token,
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState((prevState) => { 
          const updatedBookings = prevState.bookings.filter((booking: any) => {
            return booking._id !== bookingId;
          })
          return {bookings: updatedBookings, isLoading: false};
        });
        console.log(resData);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  }

  render() {
    return (
      <>{this.state.isLoading ? <Spinner /> :
        <BookingList 
          bookings={this.state.bookings}
          onDelete={this.deleteBookingHandler}
        />
      }
      </>
    );
  }
}

export default BookingsPage;