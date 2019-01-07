import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import MainReducer from './MainReducer';

export default combineReducers({
  UserReducer,
  MainReducer
});