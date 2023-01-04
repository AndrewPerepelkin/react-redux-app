import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, content: "", completed: false },
  { id: 2, content: "", completed: false }
];

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex(el => el.id === action.payload.id);
      state[elementIndex] = { ...action.payload };
    },
    remove(state, action) {
      return state.filter(el => el.id !== action.payload.id);
    }
  }
});

const { actions, reducer: taskReducer } = tasksSlice;
const { update, remove } = actions;

export function taskCompleted(task) {
  return update({ ...task, completed: !task.completed });
}
export function taskContentChanged(task, content) {
  return update({ ...task, content });
}
export function taskDeleted(task) {
  return remove({ ...task });
}

export default taskReducer;