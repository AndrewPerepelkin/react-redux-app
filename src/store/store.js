import { createStore } from 'redux';
import reducer from './tasks';

const initialState = [
  { id: 1, content: "", completed: false },
  { id: 2, content: "", completed: false }
];

function configureStore() {
  return createStore(reducer, initialState)
}

export default configureStore;