import React, { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ taskListId, onCloseTaskForm, updateTasks }) {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleInputChange = (e) => {
    setTaskDetails({
      ...taskDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await createTask(taskListId, { ...taskDetails });
      updateTasks();
      onCloseTaskForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const createTask = async (taskListId, taskDetails) => {
    try {
      const response = await axios.post(`http://localhost:3001/task-lists/${taskListId}/tasks`, taskDetails);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-violet-700 text-2xl font-bold mb-4">Create Task</h2>
        <form onSubmit={handleCreateTask}>
          <label className='block mb-2'>
            Title:
            <input
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md ml-4 h-10"
              required
            />
          </label>
          <label className='block mb-2'>
            Description:
            <input
              type="text"
              name="description"
              value={taskDetails.description}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md ml-4 h-10"
              required
            />
          </label>
          <label className='block '>
            Due Date:
            <input
              type="text"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md ml-4 h-10 "
              required
            />
          </label>
          <button
            type="submit"
            className=" mt-4 h-10 w-full bg-violet-200 rounded-md cursor-pointer hover:scale-x-105"
          >
            Create Task
          </button>
        </form>
        <button
          className="mt-4 h-10 w-full bg-gray-300 rounded-md cursor-pointer hover:scale-x-105"
          onClick={onCloseTaskForm}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
