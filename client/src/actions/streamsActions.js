import streams from '../apis/streams';
import { streamsTypes } from './types';

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({
    type: streamsTypes.FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: streamsTypes.FETCH_STREAM,
    payload: response.data,
  });
};

export const createStream = formValues => async (dispatch, getState) => {
  // associate the created stream with the user
  const { user } = getState().auth;

  const response = await streams.post('/streams', {
    ...formValues,
    user: user,
  });
  dispatch({
    type: streamsTypes.CREATE_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({
    type: streamsTypes.EDIT_STREAM,
    payload: response.data,
  });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: streamsTypes.DELETE_STREAM,
    payload: id,
  });
};
