import { combineReducers, createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { tvShowsReducer } from './reducer/tvShows';

// combining reducers is used to combine a lot of reducers
const rootReducer = combineReducers({
  tvShowsReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
