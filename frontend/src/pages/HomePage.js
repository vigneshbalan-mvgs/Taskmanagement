import React from 'react';
import TaskList from '../components/TaskList';
import './HomePage.css'

const HomePage = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default HomePage;

