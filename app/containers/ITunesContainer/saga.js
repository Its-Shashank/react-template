import { put, call, takeLatest } from 'redux-saga/effects';
import { getITunes } from '@services/itunesApi';
import { iTunesContainerTypes, iTunesContainerCreators } from './reducer';
const { REQUEST_GET_I_TUNES } = iTunesContainerTypes;
const { successGetITunes, failureGetITunes } = iTunesContainerCreators;

export function* getITunesSaga(action) {
  const response = yield call(getITunes, action.ituneName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetITunes(data));
  } else {
    yield put(failureGetITunes(data));
  }
}

export default function* iTunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES, getITunesSaga);
}
