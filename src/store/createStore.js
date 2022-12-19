// export function createStore(reducer, initialState) {
//   let state = initialState;
//   const listeners = [];

//   function getState() {
//     return state;
//   }

//   function dispatch(action) {
//     state = reducer(state, action);
//     for (let index = 0; index < listeners.length; index++) {
//       const listener = listeners[index];
//       listener();      
//     }
//   }
  
//   function subscribe(listener) {
//     listeners.push(listener);
//   }

//   return {getState, dispatch, subscribe}
// }