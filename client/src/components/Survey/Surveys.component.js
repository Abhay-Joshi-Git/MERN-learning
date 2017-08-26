import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter, Link } from 'react-router-dom';
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
        <div className="fixed-action-btn" style={{right: '220px'}}>
          <Link to="/survey/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(withRouter(SurveysComponent));