import React, { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Tasks({ selectedTaskList, openTaskForm }) {
  const tasks = selectedTaskList?.tasks || [];

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/task-lists/${selectedTaskList.id}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

  const handleFetchTasks = async () => {
    const tasks = await fetchTasks();
  };

  useEffect(() => {
    handleFetchTasks();
  }, [selectedTaskList]);

  return (
    <div className="px-6 py-6 border-r-2 border-slate-700 col-span-4">
      <h2 className="text-violet-700 text-2xl font-bold mb-4">Tasks</h2>
      {selectedTaskList ? (
        <div>
          <h3 className="font-bold text-violet-700 mb-4">{selectedTaskList.name}</h3>
          <div className="flex gap-4">
            {tasks.map((task) => (
              <div className="h-48 w-48 px-2 py-3 rounded-md bg-violet-200 cursor-pointer" key={task.id}>
                <strong>Title:</strong> {task.title} <br />
                <strong>Description:</strong> {task.description} <br />
                <strong>Due Date:</strong> {task.dueDate} <br />
                <br />
              </div>
            ))}
            <button onClick={openTaskForm} className="h-48 w-48 rounded-md bg-violet-200 cursor hover:scale-105 ease-in-out duration-300">
              <p className="text-4xl">+</p>
            </button>
          </div>
        </div>
      ) : (
        <p>No task list selected.</p>
      )}
    </div>
  );
}
