import { combineReducers } from 'redux';
import authReducer from './auth';
import { reducer as formReducer } from 'redux-form';
import surveysReducer from './surveys';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer
});