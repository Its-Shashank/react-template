import { itunesContainerReducer, initialState, itunesContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const ituneName = 'A';
    const expectedResult = state.set('ituneName', ituneName);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_I_TUNES,
        ituneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { ituneName: 's' };
    const expectedResult = state.set('ituneData', data);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_I_TUNES,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('ituneError', error);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_I_TUNES,
        error
      })
    ).toEqual(expectedResult);
  });
});
