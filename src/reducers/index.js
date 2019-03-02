import { combineReducers } from 'redux';

export default combineReducers({
  // Have to have a dummy reducer otherwise redux complains
  replaceMe: () => 'blahblah',
});