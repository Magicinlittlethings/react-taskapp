import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

  
  export default function TaskList({ openForm, onTaskListClick, taskLists, handleDeleteTaskList }){
    

    
    // const handleTaskListCreated = (newTaskList) => {
    //   setTaskLists((prevTaskLists) => [...prevTaskLists, newTaskList]);

      
    // };

  
    return (
    <div className=' py-6 border-r-2 border-slate-300 col-span-1 px-1'>
      <h2 className='px-2 text-violet-700 text-2xl font-bold mb-4'>Task List</h2>
      <ul>
        {taskLists.map((taskList) => (
          <li key={taskList.id} onClick={() => onTaskListClick(taskList)} className='flex justify-between py-1.5 cursor-pointer hover:border-2 hover:rounded-md hover:border-slate-950 px-2' >
            {taskList.name}
            <button onClick={() => handleDeleteTaskList(taskList.id)} className=" hover:scale-110">
              <p className='text-sm font-bold'> x </p>
            </button>
          </li>
        ))}
      </ul>
      <button onClick={openForm} className="h-10 w-full rounded-md bg-violet-200 cursor hover:scale-y-105 ease-in-out duration-300 mt-4 px-2"><p className="text-2xl">+</p></button>
      
    </div>
  );
};
