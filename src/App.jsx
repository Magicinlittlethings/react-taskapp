import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Tasks from './components/Tasks';
import TaskListForm from './components/TaskListForm';
import axios from 'axios';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTaskList, setSelectedTaskList] = useState(null);
  const [taskListId, setTaskListId] = useState(null);
  const [taskLists, setTaskLists] = useState([]);

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/task-lists');
        setTaskLists(response.data);
      } catch (error) {
        console.error('Error fetching task lists:', error);
      }
    };

    fetchTaskLists();
  }, []);

  const handleDeleteTaskList = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/task-lists/${taskId}`);
      setTaskLists((prevTaskLists) => prevTaskLists.filter((taskList) => taskList.id !== taskId));
    } catch (error) {
      console.error('Error deleting task list:', error);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openTaskForm = () => {
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  const handleTaskListClick = (taskList) => {
    setSelectedTaskList(taskList);
    setTaskListId(taskList.id);
  };

  const updateTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/task-lists/${taskListId}`);
      setSelectedTaskList(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTaskLists = async () => {
    try {
      const response = await axios.get('http://localhost:3001/task-lists');
      setTaskLists(response.data);
    } catch (error) {
      console.error('Error fetching task lists:', error);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-5 bg-slate-200">
      <TaskList
        openForm={openForm}
        onTaskListClick={handleTaskListClick}
        taskLists={taskLists}
        handleDeleteTaskList={handleDeleteTaskList}
        updateTaskLists={updateTaskLists}
        className="h-full"
      />
      <Tasks openTaskForm={openTaskForm} selectedTaskList={selectedTaskList} className="h-full" />
      {isFormOpen && (
        <TaskListForm
          onCloseForm={closeForm}
          onTaskListCreated={(newTaskList) => console.log('New task list created:', newTaskList)}
          updateTaskLists={updateTaskLists}
        />
      )}
      {isTaskFormOpen && (
        <TaskForm onCloseTaskForm={closeTaskForm} updateTasks={updateTasks} taskListId={taskListId} />
      )}
    </div>
  );
}
