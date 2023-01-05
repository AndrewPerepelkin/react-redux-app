import { createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todosService';

const initialState = {entities: [], isLoading: true, error: null};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = { ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state, action) {
      state.error = action.payload
      state.isLoading = false;
    }
  }
});

const { actions, reducer: taskReducer } = tasksSlice;
const { update, remove, received, taskRequested, taskRequestedFailed } = actions;

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
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