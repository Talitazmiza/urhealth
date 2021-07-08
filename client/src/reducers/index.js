import { combineReducers } from 'redux';

// import posts from './posts';
// import auth from './auth';
//
// export const reducers = combineReducers({ posts, auth });

import patients from './patients';
export const reducers = combineReducers(( patients ));
