import { put, call, takeLatest } from 'redux-saga/effects';
import { getITunes } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_I_TUNES } = itunesContainerTypes;
const { successGetITunes, failureGetITunes } = itunesContainerCreators;
export function* getITunesSaga(action) {
  const response = yield call(getITunes, action.ituneName);
  const { data, ok } = response;
  console.log(response);
  if (ok) {
    yield put(successGetITunes(data));
  } else {
    yield put(failureGetITunes(data));
  }
}
// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_I_TUNES, getITunesSaga);
}
