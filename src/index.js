import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from './store/actions';
import { initiateStore } from './store/store';

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const completeTask = ({target}) => {
    const task = state.find(el => el.id === +target.id)
    store.dispatch(actions.taskCompleted(task));
  }

  const changeTaskTitle = ({target}) => {
    const task = state.find(el => el.id === +target.id)
    store.dispatch(actions.taskTitleChanged(task, target.value));
  }

  return (
    <>
      <h1>My Tasks</h1>
      <ul>
        {state.map(el => (
          <li style={{ listStyle: 'none' }} key={el.id}>
            <input
              id={el.id}
              onChange={completeTask}
              type="checkbox"
              checked={el.completed}
              />
            <input
              id={el.id}
              type='text'
              style={{
                textDecoration: el.completed ? 'line-through' : 'none',
                outline: 'none', border: 'none',
                width: '50%',
                marginBottom: '20px',
                borderBottom: '1px solid black'
              }}
              value={el.title}
              placeholder='Enter task name...'
              onChange={changeTaskTitle}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);


