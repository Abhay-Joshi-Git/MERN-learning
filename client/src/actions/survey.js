import * as actions from './action_types';
import axios from 'axios';

export const sendServey = (survey) => async (dispatch) => {
  let res = await axios.post('/api/survey', survey);
  dispatch({
    type: actions.FETCH_USER,
    payload: res.data
  });
}