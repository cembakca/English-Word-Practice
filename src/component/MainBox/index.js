import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom'

import { typeList } from '../../constants/menuItemList';
import './style.css';


class MainBox extends Component {
  getStyle = (score) => {
    const colorList = [
      { colorCode: 'low', min: 0, max: 49 }, // red
      { colorCode: 'average', min: 50, max: 69 }, // orange
      { colorCode: 'advancing', min: 70, max: 84 }, // blue
      { colorCode: 'mastering', min: 85, max: 100 } // green
    ];
    for (let i = 0; i < colorList.length; i++) {
      if (score >= colorList[i].min && score <= colorList[i].max) {
        return colorList[i].colorCode;
      }
    }
    return null;
  }

  renderMenuItem = (item, idx) => {
    return (
      <Link
        key={idx}
        to={item.link}
      >
        <FontAwesomeIcon
          icon={item.icon}
          className="menuIcon"
        />
      </Link>
  )}

  render() {
    const value = this.getStyle(this.props.score);
    return(
      <div className="root">
        <div className="container">
          <div className="leftbox">
          <nav>
          {typeList.map(this.renderMenuItem)}
          </nav>
          </div>
          <div className="rightbox">
            <div className={this.props.mainClassName}>
              {this.props.children}
            </div>
          </div>
          <div className="progress">
            <div className="progressRoot">
              <div
                className={`bar ${value}`}
                style={{ height: `${Math.floor(this.props.score)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

function mapStateToProps(state) {
  return {
    score: state.score
  }
}

export default connect(mapStateToProps, null)(MainBox);