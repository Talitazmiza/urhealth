import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers'

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
