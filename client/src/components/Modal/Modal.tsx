/* eslint-disable react/prefer-stateless-function */
import React, { Component, MouseEvent } from 'react';

import './Modal.css';

class Modal extends Component<{
  title?: String, 
  canCancel?: Boolean, 
  canConfirm?: Boolean, 
  confirmText?: String,
  onCancel?:(event: MouseEvent<HTMLButtonElement>) => void, 
  onConfirm?:(event: MouseEvent<HTMLButtonElement>) => void}> {
  render() {
    return (
      <div className="modal">
        <header className="modal-header"><h1>{this.props.title}</h1></header>
        <section className="modal-content">
          {this.props.children}
        </section>
        <section className="modal-actions">
          {this.props.canCancel && <button className="btn" onClick={this.props.onCancel}>Cancel</button>}
          {this.props.canConfirm && <button className="btn" onClick={this.props.onConfirm}>{this.props.confirmText}</button>}
        </section>
      </div>
    );
  }
}

export default Modal;
