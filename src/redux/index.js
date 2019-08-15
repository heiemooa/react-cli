/**
 * Created by huangfushan on 2019-08-12 09:06
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

const configureStore = (reducers) => {
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger({
      actionTransformer: (action) => {
        return typeof action === 'function' ? 'Async action:' + action.name : action;
      }
    }));
  }
  middleware.push(ThunkMiddleware);

  const store = createStore(reducers, compose(applyMiddleware(...middleware)));
  console.log(store.getState());
  return store;
};

export default configureStore(reducers);
