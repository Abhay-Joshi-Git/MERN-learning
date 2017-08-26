import React, { Component } from 'react';
import { Field } from 'redux-form';
import { surveyFields } from './SurveyFields.constants';
import _ from 'lodash';

let getInput = (field, props) => {
  if (field.type === 'text') {
    return <input
      {...props.input}
      type={props.type}
      id={field.name}
      className="survey-field-input"
    />
  }
  if (field.type === 'textarea') {
    return <textarea className="materialize-textarea"
      {...props.input}
      id={field.name}
    />
  }
}

const ShowErrorComp = (props) => {
  let { touched, dirty, error, warning } = props.meta;
  return (
    (dirty || touched) && error ? <div className="red-text">
      {error}
    </div> : null
  );
}

export default (props) => {
  const field = _.find(surveyFields, (fld) => fld.name === props.input.name);
  return (
    <div className='input-field'>
      {getInput(field, props)}
      <ShowErrorComp meta={props.meta} />
      <label htmlFor={field.name} className="field-label">{field.label}</label>
    </div>
  )


}
