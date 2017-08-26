import * as actions from './action_types';
import axios from 'axios';
import _ from 'lodash';
export const sendServey = (survey, cb) => async (dispatch) => {
  let res = await axios.post('/api/survey', survey);
  if (_.isFunction(cb)) {
    cb(res);
  }
  dispatch({
    type: actions.FETCH_USER,
    payload: res.data
  });
}