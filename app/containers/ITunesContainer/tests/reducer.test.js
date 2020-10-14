// import produce from 'immer'
import { iTunesContainerReducer, iTunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_I_TUNES is dispatched', () => {
    const ituneName = 'Mac';
    const expectedResult = { ...state, ituneName };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.REQUEST_GET_I_TUNES,
        ituneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the itune data is present and ituneLoading = false when REQUEST_GET_I_TUNES is dispatched', () => {
    const data = { name: 'Hook' };
    const expectedResult = { ...state, ituneData: data };
    expect(
      iTunesContainerReducer(state, {
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES,
        ituneData: data
      })
    ).toEqual(expectedResult);
  });
});
