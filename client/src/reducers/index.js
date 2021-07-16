import { combineReducers } from 'redux';

// import posts from './posts';
// import auth from './auth';
//
// export const reducers = combineReducers({ posts, auth });

import patients from './patients';
export const reducers = combineReducers({ patients });

// liat line 9
// aku kemaren nulisnya combineReducers((patients))
// pantes aja reducersnya gak dikenali jadi storenya yang err karena gak tau siapa yang distore ke variabel store