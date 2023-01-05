import { createAction, createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todosService';

const initialState = [];

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      return action.payload;
    },
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
const { update, remove, received } = actions;

const taskRequested = createAction('task/requested')
const taskRequestedFailed = createAction('task/requestedFailed')

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    console.log(data);
    dispatch(received(data))
  } catch (error) {
    dispatch(taskRequestedFailed(error.message));
  }
}

export const completeTask = (task) => (dispatch, getState) => {
  dispatch(update({ ...task, completed: !task.completed }))
}
export function taskTitleChanged(task, title) {
  return update({ ...task, title });
}
export function taskDeleted(task) {
  return remove({ ...task });
}

export default taskReducer;