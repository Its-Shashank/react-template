/**
 * Test iTunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import iTunesContainerSaga, { getITunesSaga } from '../saga';
import { iTunesContainerTypes } from '../reducer';
import { apiResponseGenerator } from '@utils/testUtils';
import { getITunes } from '@services/itunesApi';

describe('ITunesContainer saga tests', () => {
  const generator = iTunesContainerSaga();
  const ituneName = 'hook';
  let getITunesGenerator = getITunesSaga({ ituneName });

  it('should start task to watch for REQUEST_GET_I_TUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesContainerTypes.REQUEST_GET_I_TUNES, getITunesSaga));
  });

  it('should ensure that the action FAILURE_GET_I_TUNES is dispatched when the api calls fails', () => {
    const res = getITunesGenerator.next().value;
    expect(res).toEqual(call(getITunes, ituneName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching the itune information.'
    };
    expect(getITunesGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.FAILURE_GET_I_TUNES,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_I_TUNES is dispatched when the api call succeeds', () => {
    getITunesGenerator = getITunesSaga({ ituneName });
    const res = getITunesGenerator.next().value;
    expect(res).toEqual(call(getITunes, ituneName));
    const itunesResponse = {
      totalCount: 1,
      items: [{ ituneName }]
    };
    expect(getITunesGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put({
        type: iTunesContainerTypes.SUCCESS_GET_I_TUNES,
        data: itunesResponse
      })
    );
  });
});
