import { createStore, applyMiddleware,compose } from 'redux';
//import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';

import rootReducer from '../store/reducers';

//import { createLogger } from 'redux-logger';
//const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(promise)//,loggerMiddleware)
    )
);
