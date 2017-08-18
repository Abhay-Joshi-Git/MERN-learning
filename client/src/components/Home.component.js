import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeComponent extends Component {
  componentWillReceiveProps(props) {
    if (this.props.auth !== props.auth && (props.auth)) {
      console.log('got auth', props.auth);
      this.props.history.push('/surveys');
    }
  }

  render() {
    return (
      <div>
        Home Component
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(withRouter(HomeComponent));