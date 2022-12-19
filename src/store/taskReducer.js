import * as actions from './actionTypes'
export function taskReducer(state, action) {
  switch (action.type) {
    case actions.taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
      newArray[elementIndex] = {...newArray, ...action.payload};
      return newArray;
    }    
    case actions.taskDeleted: {
      const newArray = [...state];
      const filteredArray = newArray.filter(el => el.id !== action.payload.id);
      return filteredArray;
    }

  
    default:
      return state;
  }
}