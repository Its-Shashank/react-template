import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import homeContainerReducer from 'containers/HomeContainer/reducer';
import iTunesContainerReducer from 'containers/ITunesContainer/reducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    homeContainer: homeContainerReducer,
    iTunesContainer: iTunesContainerReducer
  });

  return rootReducer;
}
