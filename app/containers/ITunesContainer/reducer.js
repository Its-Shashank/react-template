/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetITunes: ['ituneName'],
  successGetITunes: ['data'],
  failureGetITunes: ['error'],
  clearITunes: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    console.log(action);
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_I_TUNES:
        return initialState.set('ituneName', action.ituneName);
      case itunesContainerTypes.CLEAR_I_TUNES:
        return initialState;
      case itunesContainerTypes.SUCCESS_GET_I_TUNES:
        return state.set('ituneData', action.data);
      case itunesContainerTypes.FAILURE_GET_I_TUNES:
        return state.set('ituneError', _.get(action.error, 'message', 'something_went_wrong'));
    }
    return state;
  });

export default itunesContainerReducer;
