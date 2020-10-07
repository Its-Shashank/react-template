import { takeLatest } from 'redux-saga/effects';
import iTunesContainerSaga, { getITunesSaga } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ITuneContainer saga tests', () => {
  const generator = iTunesContainerSaga();
  it('should start task to watch for REQUEST_GET_I_TUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_I_TUNES, getITunesSaga));
  });
});
