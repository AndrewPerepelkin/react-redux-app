import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {completeTask, taskContentChanged, taskDeleted} from './store/tasks';
import configureStore from './store/store';
import delIcon from './icons/icons8-close-50.png';

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const getCurrentTask = (id) => state.find(el => el.id === +id)

  const changeTaskTitle = ({target}) => {
    const task = getCurrentTask(target.id);
    store.dispatch(taskContentChanged(task, target.value));
  }

  const deleteTask = ({target}) => {
    const task = getCurrentTask(target.id);
    store.dispatch(taskDeleted(task));
  }

  return (
    <div style={{
      margin: '0 auto',
      width: '400px',
      fontFamily: 'sans-serif'
    }}>
      <h1>My Tasks</h1>
      <ul style={{
        padding: 0
      }}>
        {state.map(el => (
          <li style={{ listStyle: 'none' }} key={el.id}>
            <input
              id={el.id}
              onChange={()=>store.dispatch(completeTask(el))}
              type="checkbox"
              checked={el.completed}
              />
            <input
              id={el.id}
              type='text'
              style={{
                textDecoration: el.completed ? 'line-through' : 'none',
                outline: 'none', border: 'none',
                width: '75%',
                height: '20px',
                marginBottom: '20px',
                borderBottom: '1px solid black'
              }}
              value={el.title}
              placeholder='Enter task content...'
              onChange={changeTaskTitle}
            />
            <button
              id={el.id}
              onClick={deleteTask}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent',
                margin: 0,
                padding: 0,
                backgroundImage: `url(${delIcon})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);


