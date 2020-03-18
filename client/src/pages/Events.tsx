/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import "./Events.css";
import EventList from "../components/Events/EventList";
import Spinner from "../components/Spinner/Spinner";

class EventsPage extends Component<
  {},
  { creating: any; events: any[]; isLoading: boolean; selectedEvent: any }
> {
  titleElRef: React.RefObject<HTMLInputElement>;
  priceElRef: React.RefObject<HTMLInputElement>;
  dateElRef: React.RefObject<HTMLInputElement>;
  descriptionElRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.titleElRef = React.createRef<HTMLInputElement>();
    this.priceElRef = React.createRef<HTMLInputElement>();
    this.dateElRef = React.createRef<HTMLInputElement>();
    this.descriptionElRef = React.createRef<HTMLTextAreaElement>();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  state: {
    creating: any;
    events: any[];
    isLoading: boolean;
    selectedEvent: any;
  } = {
    creating: false,
    events: [],
    isLoading: true,
    selectedEvent: null
  };

  isActive = true;
  static contextType = AuthContext;

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const inputTitle = this.titleElRef.current?.value;
    const inputPrice = this.priceElRef.current?.value;
    const inputDate = this.dateElRef.current?.value;
    const inputDescription = this.descriptionElRef.current?.value;

    if (inputTitle?.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: String!, $date: String!){
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}){
            _id
            title
            description
            date
            price
          }
        }
      `,
      variables: {
        title: inputTitle,
        description: inputDescription,
        price: inputPrice,
        date: inputDate
      }
    };

    const token = this.context.token;
    let updatedEvents: any[];
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data);
        this.setState(prevState => {
          updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          });
        });
        return { events: updatedEvents };
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          events{
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        if (this.isActive){
          this.setState({ events: events, isLoading: false });
        }
      })
      .catch(err => {
        if (this.isActive){
          this.setState({ isLoading: false });
        }
        console.log(err);
      });
  }

  showDetailHandler = (eventId: any) => {
    this.setState(prevState => {
      const currentEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: currentEvent };
    });
  };

  bookEventHandler = () => {
    if (!this.context.token){
      this.setState({selectedEvent:null});
      return;
    }
    const requestBody = {
      query: `
        mutation BookEvent($id: ID!){
          bookEvent(eventId: $id){
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: this.state.selectedEvent._id,
      }
    };
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({selectedEvent:null});
        console.log(resData);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.isActive = false;
  }
  render() {
    return (
      <>
        {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <p> Modal Content</p>
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={this.dateElRef}></input>
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Share your own Events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? "Book" : "Confirm"}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>${parseFloat(this.state.selectedEvent.price)} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </>
    );
  }
}

export default EventsPage;