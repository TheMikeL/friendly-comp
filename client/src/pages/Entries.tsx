/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import "./Pages.css";
import Modal from '@material-ui/core/Modal';
import EntryList from "../components/Entry/EntryList";
import Spinner from "../components/Spinner/Spinner";

class EntriesPage extends Component<
  {},
  { creating: any; entries: any[]; isLoading: boolean; selectedEntry: any }
> {
  titleElRef: React.RefObject<HTMLInputElement>;
  dateElRef: React.RefObject<HTMLInputElement>;
  descriptionElRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.titleElRef = React.createRef<HTMLInputElement>();
    this.dateElRef = React.createRef<HTMLInputElement>();
    this.descriptionElRef = React.createRef<HTMLTextAreaElement>();
  }

  componentDidMount() {
    this.fetchEntries();
  }

  state: {
    creating: any;
    entries: any[];
    isLoading: boolean;
    selectedEntry: any;
  } = {
    creating: false,
    entries: [],
    isLoading: true,
    selectedEntry: null
  };

  isActive = true;
  static contextType = AuthContext;

  startCreateEntryHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const inputTitle = this.titleElRef.current?.value;
    const inputDate = this.dateElRef.current?.value;
    const inputDescription = this.descriptionElRef.current?.value;

    if (inputTitle?.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        mutation CreateEntry($title: String!, $description: String!, $date: String!){
          createEntry(entryInput: {title: $title, description: $description, date: $date}){
            _id
            title
            description
            date
          }
        }
      `,
      variables: {
        title: inputTitle,
        description: inputDescription,
        date: inputDate
      }
    };

    const token = this.context.token;
    let updatedEntries: any[];
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
          updatedEntries = [...prevState.entries];
          updatedEntries.push({
            _id: resData.data.createEntry._id,
            title: resData.data.createEntry.title,
            description: resData.data.createEntry.description,
            date: resData.data.createEntry.date,
            creator: {
              _id: this.context.userId
            }
          });
        });
        return { entries: updatedEntries };
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEntry: null });
  };

  fetchEntries() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          entries{
            _id
            title
            description
            date
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
        const entries = resData.data.entries;
        if (this.isActive){
          this.setState({ entries: entries, isLoading: false });
        }
      })
      .catch(err => {
        if (this.isActive){
          this.setState({ isLoading: false });
        }
        console.log(err);
      });
  }

  showDetailHandler = (entryId: any) => {
    this.setState(prevState => {
      const currentEntry = prevState.entries.find(e => e._id === entryId);
      return { selectedEntry: currentEntry };
    });
  };

  bookEntryHandler = () => {
    if (!this.context.token){
      this.setState({selectedEntry:null});
      return;
    }
    const requestBody = {
      query: `
        mutation BookEntry($id: ID!){
          bookEntry(entryId: $id){
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: this.state.selectedEntry._id,
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
        this.setState({selectedEntry:null});
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
        {/* {(this.state.creating || this.state.selectedEntry) && <Backdrop />} */}
        {/* {this.state.creating && (
        //   <Modal>
        //     <>
        //     <p> Modal Content</p>
        //     <form>
        //       <div className="form-control">
        //         <label htmlFor="title">Title</label>
        //         <input type="text" id="title" ref={this.titleElRef}></input>
        //       </div>
        //       <div className="form-control">
        //         <label htmlFor="date">Date</label>
        //         <input type="date" id="date" ref={this.dateElRef}></input>
        //       </div>
        //       <div className="form-control">
        //         <label htmlFor="description">Description</label>
        //         <textarea
        //           id="description"
        //           rows={4}
        //           ref={this.descriptionElRef}
        //         ></textarea>
        //       </div>
        //     </form>
        //     </>
        //   </Modal>
        // )}
        // {this.context.token && (
        //   <div className="entries-control">
        //     <button className="btn" onClick={this.startCreateEntryHandler}>
        //       Create Entry
        //     </button>
        //   </div>
        // )}
        // {this.state.selectedEntry && (
        //   <Modal>
        //     <>
        //     <h1>{this.state.selectedEntry.title}</h1>
        //     <h2>{new Date(this.state.selectedEntry.date).toLocaleDateString()}</h2>
        //     <p>{this.state.selectedEntry.description}</p>
        //     </>
        //   </Modal>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <EntryList
            entries={this.state.entries}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )} */}
      </>
    );
  }
}

export default EntriesPage;
