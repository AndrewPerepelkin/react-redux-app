import * as actions from './actionTypes';
export function taskReducer(state, action) {
  switch (action.type) {
    case actions.taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
      newArray[elementIndex] = {...newArray, ...action.payload};
      return newArray;
    }    
    case actions.taskDeleted: {
      return state.filter(el => el.id !== action.payload.id);
    }
    case actions.taskAdded: {
      const newArray = [...state, action.payload];
      return newArray;
    }  
    default:
      return state;
  }
}