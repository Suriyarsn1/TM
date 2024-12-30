import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const API_URL = process.env.REACT_APP_API_URL + '/api/tasks';

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/${user.username}`);
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [user.username]);

  const addTask = async () => {
    if (taskInput.trim()) {
      try {
        const response = await axios.post(API_URL, { username: user.username, text: taskInput });
        setTasks([...tasks, response.data]);
        setTaskInput('');
      } catch (err) {
        console.error('Error adding task:', err);
      }
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Welcome, {user.username}</h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center py-2"
            >
              <span
                className={`flex-grow cursor-pointer ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
                onClick={() => toggleTaskCompletion(task._id, task.completed)}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;