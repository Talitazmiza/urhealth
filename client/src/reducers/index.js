import { combineReducers } from 'redux';

// import posts from './posts';
// import auth from './auth';
//
// export const reducers = combineReducers({ posts, auth });

import patients from './patients';
import authReducer from './auth';
import dataAkun from './create';
export const reducers = combineReducers({ patients, authReducer, dataAkun });

// liat line 9
// aku kemaren nulisnya combineReducers((patients))
// pantes aja reducersnya gak dikenali jadi storenya yang err karena gak tau siapa yang distore ke variabel store