import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const toggleTask = async () => {
    await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    fetchTasks();
  };

  const deleteTask = async () => {
    await axios.delete(`/api/tasks/${task._id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    fetchTasks();
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleTask}
      />
      {task.text}
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default TaskItem;

