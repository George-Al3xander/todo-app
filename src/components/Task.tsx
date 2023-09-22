import { useState } from "react";
import { typeTask } from "../types/types"
import { FaTrash } from "react-icons/fa";
import { db } from "../../firebase-config";
import {doc, deleteDoc} from "firebase/firestore"


const Task = ({task}: {task: typeTask}) => {
    const {title, id} = task
    const [hoverStatus, setHoverStatus] = useState(false);

    const deleteTask = async () => {
        const taskDoc = doc(db, "Tasks", id);
        await deleteDoc(taskDoc)
    }
    return(<li onMouseEnter={() => setHoverStatus(true)} onMouseLeave={() => setHoverStatus(false)} className="bg-gray-200 rounded-md text-lg  font-medium flex justify-between hover:cursor-pointer">
        <h1 key={"heading" + id}  className="p-4">{title}</h1>
        <button key={"btn" + id} onClick={deleteTask} className={`bg-red-600 flex items-center rounded-e-md p-2 fill-white justify-center min-w-[3.2em] transition-all duration-300 ${hoverStatus ? "opacity-100" : "opacity-0"}`}><FaTrash key={"icon" + id} fill={"true"} size={25}/></button>  
    </li>)
}

export default Task