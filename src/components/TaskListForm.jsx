import React, { useState } from 'react';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function TaskListForm({ onCloseForm, updateTaskLists }) {
  const [taskListName, setTaskListName] = useState('');

  const handleInputChange = (e) => {
    setTaskListName(e.target.value);
  };

  const createTaskList = async () => {
    try {
      const response = await axios.post(`${backendUrl}/task-lists`, { name: taskListName });
      return response.data;
    } catch (error) {
      console.error('Error creating task list:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTaskList = await createTaskList(); 
      updateTaskLists(); 
      console.log('New task list created:', newTaskList);
    } catch (error) {
      console.error('Error handling create task list:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-violet-700 text-2xl font-bold mb-4">Create Task List</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task List Name:
            <input
              type="text"
              value={taskListName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md ml-4 h-10"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 h-10 w-full bg-violet-200 rounded-md cursor-pointer hover:scale-x-105"
          >
            Create Task List
          </button>
        </form>
        <button
          className="mt-4 h-10 w-full bg-gray-300 rounded-md cursor-pointer hover:scale-x-105"
          onClick={onCloseForm}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
