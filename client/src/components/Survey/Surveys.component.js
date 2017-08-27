import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/survey';

class SurveysComponent extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  componentWillReceiveProps(props) {
    if (!(props.auth)) {
      this.props.history.push('/');
    }
  }

  render() {
    console.log('surveys', this.props.surveys);
    return (
      <div>
        <h3 className="center-align">Surveys</h3>
        {this.getSurveysList()}
        <div className="fixed-action-btn" style={{right: '220px'}}>
          <Link to="/survey/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }

  getSurveysList() {
    return this.props.surveys.map(survey => {
      let createdDate =  new Date(survey.createdDate);
      return (
        <div key={survey._id} className="survey-thumbnail-container z-depth-3">
          <h4>{survey.title}</h4>
          <div className="survey-info-container">
            <label className="survey-info-label">Subject:</label>
            {survey.subject}
          </div>
          <div>
            <label className="survey-info-label">Created Date:</label>
            {createdDate.toDateString()}
          </div>
          <div className="survey-info-container">
            <strong>Responses : </strong>
            <div>
              <label className="survey-info-label">Yes:</label>
              {survey.yes}
            </div>
            <div>
              <label className="survey-info-label">No:</label>
              {survey.no}
            </div>
          </div>
        </div>
      )
    })
  }

}

const mapStateToProps = ({ auth, surveys }) => ({ auth, surveys });
export default connect(mapStateToProps, { fetchSurveys })(withRouter(SurveysComponent));