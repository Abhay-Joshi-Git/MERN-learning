import React,  { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendServey } from '../../actions/survey';
import { withRouter } from 'react-router-dom';
import './SurveyNew.css';

import SurveyFormField from './SurveyFormField.component';
import { surveyFields } from './SurveyFields.constants';

class SurveyNewComponent extends Component {
  render() {
    console.log('survey new render');
    return (
      <div className="form-container">
        <form onSubmit={this.props.handleSubmit(this.sendSurvey)}>
          {this.getFields()}
          <Link to="/surveys" className="btn white-text orange">
            Cancel
          </Link>
          <button type="submit" className="btn white-text Green right">
            Send Survey
          </button>
        </form>
      </div>
    );
  }

  sendSurvey = (values) => {
    this.props.sendServey(values, () => {
      this.props.history.push('/surveys');
    });
  }

  getFields() {
    return surveyFields.map((field) => {
      return (
        <Field
          key={field.name}
          name={field.name}
          type={field.type}
          validate={field.validate || [() => undefined]}
          component={SurveyFormField}/>
      );
    });
  }
}

const validate = values => {
  let errors = [];
  surveyFields.forEach(fld => {
    let fldName = fld.name;
    if (!values[fldName]) {
      errors[fldName] = fld.label + ' is required. Please provide a value.';
    }
  });
  return errors;
}

let SurveyFormComponent = reduxForm({
  form: 'surveyNew',
  validate
})(SurveyNewComponent);

export default connect(null, { sendServey })(withRouter(SurveyFormComponent));