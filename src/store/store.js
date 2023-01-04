import { createStore } from 'redux';
import { taskReducer } from './tasks/reducer';

const initialState = [
  { id: 1, title: "", completed: false },
  { id: 2, title: "", completed: false }
];

function configureStore() {
  return createStore(taskReducer, initialState)
}

export default configureStore;