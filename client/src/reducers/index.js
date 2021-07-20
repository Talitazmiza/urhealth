import { combineReducers } from 'redux';

// import posts from './posts';
// import auth from './auth';
//
// export const reducers = combineReducers({ posts, auth });

import patients from './patients';
import authReducer from './auth';
import dataAkun from './create';
export const reducers = combineReducers({ patients, authReducer, dataAkun });
