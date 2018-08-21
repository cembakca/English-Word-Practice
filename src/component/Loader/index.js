import React, { Component } from 'react';

import './style.css';


export default class Loader extends Component {
  renderBubble = () => <div className="bubble" />

  render() {
    return (
      <div className="loader">
        {this.renderBubble()}
        {this.renderBubble()}
        {this.renderBubble()}
      </div>
    );
  }
}

