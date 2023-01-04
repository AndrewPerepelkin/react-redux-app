const TASK_UPDATED = 'task/updated';
const TASK_DELETED = 'task/deleted';

export function taskCompleted(task) {
  return { type: TASK_UPDATED, payload: { ...task, completed: !task.completed } }
}
export function taskContentChanged(task, content) {
  return { type: TASK_UPDATED, payload: { ...task, content } }
}
export function taskDeleted(task) {
  return { type: TASK_DELETED, payload: { ...task } }
}

function reducer(state, action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
      newArray[elementIndex] = {...newArray, ...action.payload};
      return newArray;
    }    
    case TASK_DELETED: {
      return state.filter(el => el.id !== action.payload.id);
    }
    default:
      return state;
  }
}

export default reducer;