import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todosService';

const initialState = [];

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    set(state, action) {
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
const { update, remove, set } = actions;

export const getTasks = () => async (dispatch) => {
  try {
    const data = await todosService.fetch()
    console.log(data);
    dispatch(set(data))
  } catch (error) {
    console.log(error);
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