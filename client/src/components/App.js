import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeComponent from './Home.component';
import SurveysComponent from './Surveys.component';
import HeaderComponent from './Header.component';

import { auth } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.auth();
  }

  render() {
    return (
      <div className="App container">
        <BrowserRouter>
          <div>
            <HeaderComponent />
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/surveys" component={SurveysComponent} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, {auth})(App);
