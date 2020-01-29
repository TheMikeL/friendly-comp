import React, { Component } from 'react'
import './Spinner.css';

class Spinner extends Component<{}> {
  render() {
    return (
      <div className="spinner">
        <div className="lds-dual-ring"></div>
      </div>
    )
  }
}

export default Spinner;
