import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, content: "", completed: false },
  { id: 2, content: "", completed: false }
];

const update = createAction('task/updated');
const remove = createAction('task/removed');

export function taskCompleted(task) {
  return update({ ...task, completed: !task.completed });
}
export function taskContentChanged(task, content) {
  return update({ ...task, content });
}
export function taskDeleted(task) {
  return remove({ ...task });
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex(el => el.id === action.payload.id);
      state[elementIndex] = {...state, ...action.payload};
    })
    .addCase(remove, (state, action) => {
      return state.filter(el => el.id !== action.payload.id);
    })
})

export default taskReducer;