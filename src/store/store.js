import { createStore } from 'redux';
import { taskReducer } from './taskReducer';

const initialState = [
  { id: '1', title: "", completed: false }
];

export function initiateStore() {
  return createStore(taskReducer, initialState)
}