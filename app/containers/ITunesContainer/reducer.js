import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { ituneName: null, ituneData: {}, ituneError: null };

export const { Types: iTunesContainerTypes, Creators: iTunesContainerCreators } = createActions({
  requestGetITunes: ['ituneName'],
  successGetITunes: ['data'],
  failureGetITunes: ['error'],
  clearITunes: []
});

export const iTunesContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case iTunesContainerTypes.REQUEST_GET_I_TUNES:
        draft.ituneName = action.ituneName;
        break;
      case iTunesContainerTypes.SUCCESS_GET_I_TUNES:
        draft.ituneData = action.data;
        break;
      case iTunesContainerTypes.FAILURE_GET_I_TUNES:
        draft.ituneError = get(action.error, 'message', 'something_went_wrong');
        break;
      case iTunesContainerTypes.CLEAR_I_TUNES:
        return initialState;
      default:
        return state;
    }
  });

export default iTunesContainerReducer;
