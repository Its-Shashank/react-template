import { createSelector } from 'reselect';
import { get } from 'lodash';
import { initialState } from './reducer';

export const selectITunesContainerDomain = state => state.iTunesContainer || initialState;

export const makeSelectITunesContainer = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => substate
  );
export const selectITunesData = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'ituneData', [])
  );

export const selectITunesError = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'ituneError', null)
  );

export const selectITuneName = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => get(substate, 'ituneName', null)
  );

export default makeSelectITunesContainer;
