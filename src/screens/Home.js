import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../contexts/useUser';

const url = process.env.REACT_APP_API_URL;

function Home() {
  const { user } = useUser();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const headers = { headers: {Authorization:user.token}};
    axios.get(url, headers)
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error);
        setTasks([]);
      })
  }, [user.token]);

  const addTask = () => {
    const headers = { headers: {Authorization:user.token}};
    axios.post(url + '/create', {description: task}, headers)
      .then(response => {
        if (response.data?.id) {
          setTasks([...tasks, {id: response.data.id, description: task}]);
          setTask('');
        } else {
          alert('Task not created: No id returned from server');
        }
      })
      .catch(error => {
        const message = error.response?.data?.error || error.message;
        alert(message);
      })
  }

  const deleteTask = (id) => {
    const headers = { headers: {Authorization:user.token}};
    axios.delete(url + '/delete/' + id, headers)
      .then(response => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch(error => {
        alert(error.response.data.error ? error.response.data.error : error);
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form id="todo-form">
        <input 
          type="text" 
          placeholder="Add new task" 
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}
        />
        <button type="submit">Add</button>
      </form>

      <ul id="todos">
          {
            tasks.map(item => (
              <Row key={item.id} item={item} deleteTask={deleteTask}/>
            ))
          }
      </ul>
    </div>
  );
}

export default Home;
