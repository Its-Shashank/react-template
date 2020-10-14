/*
 *
 * ITunesContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { ituneName: null, ituneData: [], ituneError: null };

export const { Types: iTunesContainerTypes, Creators: iTunesContainerCreators } = createActions({
  requestGetITunes: ['ituneName'],
  successGetITunes: ['data'],
  failureGetITunes: ['error'],
  clearITunes: []
});

/* eslint-disable default-case, no-param-reassign */
export const iTunesContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case iTunesContainerTypes.REQUEST_GET_I_TUNES:
        draft.ituneName = action.ituneName;
        break;
      case iTunesContainerTypes.SUCCESS_GET_I_TUNES:
        draft.ituneData = action.ituneData;
        break;
      case iTunesContainerTypes.FAILURE_GET_I_TUNES:
        draft.ituneError = get(action.error, 'message', 'something_went_wrong');
        break;
      default:
        return state;
    }
  });

export default iTunesContainerReducer;
