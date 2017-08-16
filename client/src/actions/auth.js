import { FETCH_USER } from './action_types';
import axios from 'axios';

export const auth = () => async (dispatch) => {
  const res = await axios.get('/api/get-user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}

export const stripe = (token) => async(dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}