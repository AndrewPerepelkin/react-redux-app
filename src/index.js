import React, {useEffect} from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import configureStore from './store/store';
import {completeTask, getTasks, taskTitleChanged, taskDeleted, loadTasks, getTasksLoadingStatus, addTask} from './store/tasks';
import { getError } from './store/errors';
import delIcon from './icons/icons8-close-50.png';
import addIcon from './icons/icons8-add-50.png';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const getCurrentTask = (id) => state.find(el => el.id === +id);

  const changeTaskTitle = ({ target }) => {
    const task = getCurrentTask(target.id);
    dispatch(taskTitleChanged(task, target.value));
  };

  const deleteTask = ({ target }) => {
    const task = getCurrentTask(target.id);
    dispatch(taskDeleted(task));
  };

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div style={{
      margin: '0 auto',
      width: '400px',
      fontFamily: 'sans-serif',
      position: 'relative'
    }}>
      <h1 style={{
        fontWeight: 'lighter'
      }}>My Tasks</h1>
      <ul style={{
        padding: 0
      }}>
        {state.map(el => (
          <li style={{ listStyle: 'none' }} key={el.id}>
            <input
              id={el.id}
              onChange={()=>dispatch(completeTask(el))}
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
      <button
        onClick={()=>dispatch(addTask())}
        style={{
          position: 'absolute',
          right: 0,
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent',
          margin: '0 53px 0 0',
          padding: 0,
          backgroundImage: `url(${addIcon})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >        
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);


