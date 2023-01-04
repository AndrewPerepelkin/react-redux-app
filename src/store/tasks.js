import { createAction } from '@reduxjs/toolkit';

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

function reducer(state, action) {
  switch (action.type) {
    case update.type: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
      newArray[elementIndex] = {...newArray, ...action.payload};
      return newArray;
    }    
    case remove.type: {
      return state.filter(el => el.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default reducer;