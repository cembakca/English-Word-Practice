import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import scoreReducer from './reducers/scoreReducer';

import WordBox from './component/WordBox';
import ListeningBox from './component/ListeningBox';
import About from './component/About';
import Contribution from './component/Contribution';


class App extends Component {
  render() {
    return (
      <Provider store={createStore(scoreReducer)} >
        <Router>
        <div>
          <Route exact path="/" component={About} />
          <Route path="/words" component={WordBox} />
          <Route path="/listening" component={ListeningBox} />
          <Route path="/contribution" component={Contribution} />
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
