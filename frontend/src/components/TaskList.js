import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <TaskForm fetchTasks={fetchTasks} />
      <div>
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

