import { createStore } from 'redux';
import taskReducer from './tasks';

function configureStore() {
  return createStore(taskReducer)
}

export default configureStore;