import * as actions from './action_types';
import axios from 'axios';

export const auth = () => async (dispatch) => {
  const res = await axios.get('/api/get-user');
  dispatch({
    type: actions.FETCH_USER,
    payload: res.data
  });
}

export const stripe = (token) => async(dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: actions.FETCH_USER,
    payload: res.data
  });
}

export const logOut = () => async(dispatch) => {
  const res = await axios.get('/api/logout');
  dispatch({
    type: actions.FETCH_USER,
    payload: null
  });
}