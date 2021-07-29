import { combineReducers } from 'redux';
import patients from './patients';
import doctors from './doctors';
import authReducer from './auth';

export const reducers = combineReducers({ patients, authReducer, doctors });
