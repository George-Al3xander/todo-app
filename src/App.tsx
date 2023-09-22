import { useState } from 'react'

import { AiOutlinePlus } from "react-icons/ai";
import Task from './components/Task';
import { useTasks } from './components/hooks/useTasks';
import { addDoc } from 'firebase/firestore';
import { tasksCollectionRef } from '../firebase-config';
import {doc, deleteDoc} from "firebase/firestore"
import { db } from '../firebase-config';
function App() {
  const blankValid = new RegExp(/\S/)
  const tasks = useTasks();
  const [currentInput, setCurrentInput] = useState("");
  
  const createTask = async () => {
    await addDoc(tasksCollectionRef, {title: currentInput, date: new Date()});
    setCurrentInput("")
  }

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "Tasks", id);
    await deleteDoc(taskDoc)
}
  const clearAllTasks = async () => {
    tasks.forEach(async (task) => {
      await deleteTask(task.id)
    })
  }
 
  return (
    <div className='md:w-[min(90%,40rem)] m-auto p-4 flex flex-col  gap-4 '>
      <h1 className='text-2xl py-2 font-bold'>Daily Coding Goals</h1>
      <form onSubmit={(e) => {
        e.preventDefault();   
        const form = e.target as HTMLFormElement    
        createTask().then(() => form.reset())
      }} className='fill-white text-lg flex font-medium gap-2'>
        <input onChange={(e) => setCurrentInput(e.target.value.trim())} className='p-2 border-2 rounded-md border-gray-300 w-[100%]' placeholder='Add your new task' type="text" />
        <button  disabled={blankValid.test(currentInput) ? false : true} className='bg-primary flex items-center rounded-md p-2 disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointerdasasd'>
          <AiOutlinePlus  fill={"true"}  size={35}/>
        </button>
      </form>
      {tasks.length > 0 ?
      <ul key={"tasks"} className='flex flex-col gap-2 max-h-[65vh] overflow-y-scroll'>
        {tasks.map((task) => {
          return <Task key={task.id} task={task}/>
        })}
      </ul>
      :
      null
      }

      <div className='text-lg  font-medium flex gap-2 items-center justify-between'>
      {tasks.length > 0 ?
      <>      
      <p>You have {tasks.length} pending task{tasks.length == 1 ? "" : "s"}</p>
      <button onClick={clearAllTasks}   className='basis-[30%] max-w-[7.5rem] bg-primary text-white p-1 rounded'>Clear all</button>
      </>
      :
      <p>You have no pending tasks</p>
      }
      </div>
    </div>
  )
}

export default App
