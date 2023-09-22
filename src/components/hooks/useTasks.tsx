import {useState, useEffect} from "react"
import { typeTask } from "../../types/types"
import {tasksCollectionRef} from "../../../firebase-config.ts"
import { getDocs } from "firebase/firestore"

export const useTasks = () => {

    const [tasks, setTasks] = useState<typeTask[]>([])
    const getTasks = async () =>{
        const res = await getDocs(tasksCollectionRef);
        let data : typeTask[] = res.docs.map((doc) => ({...doc.data(), id: doc.id}));        
        setTasks(data)
    }
    useEffect(() => {
        getTasks();        
    })
    return tasks
}