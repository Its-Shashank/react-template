import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectITunesContainerDomain = state =>
  (state.itunesContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectITunesContainer = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => substate
  );

export const selectITuneData = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => _.get(substate, 'ituneData', null)
  );

export const selectITuneError = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => _.get(substate, 'ituneError', null)
  );

export const selectITuneName = () =>
  createSelector(
    selectITunesContainerDomain,
    substate => _.get(substate, 'ituneName', null)
  );

export default selectITunesContainer;
