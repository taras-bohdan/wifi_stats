import { combineReducers } from 'redux';
import appState from './appState.reducer';
import statistics from './statistics.reducer';
import usersList from './usersList.reducer';

export default combineReducers({
  appState,
  usersList,
  stats: statistics,
});
