import _ from 'lodash';

let recipientsValidate = (value) => {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errors;
  if (value) {
    let recipientsArray = value.split(',');
    let firstFalutyRecipientVal = recipientsArray.find(recipient => !emailRegex.test(recipient.trim()));
    if (firstFalutyRecipientVal) {
      errors = 'invalid email - ' + firstFalutyRecipientVal;
    }
  }
  return errors;
};

const surveyFields = [
  {name: 'title', label: 'Survey Title', type:'text', required: true},
  {name: 'subject', label: 'Survey Subject', type:'text', required: true},
  {name: 'body', label: 'Survey body', type: 'textarea', required: true},
  {name: 'recipients', label: 'Recipients List', type:'text', required: true,
    validate: [recipientsValidate]}
];


export {
  surveyFields
}