import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SurveysComponent extends Component {
  componentWillReceiveProps(props) {
    if (!(props.auth)) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        Surveys Component
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(withRouter(SurveysComponent));