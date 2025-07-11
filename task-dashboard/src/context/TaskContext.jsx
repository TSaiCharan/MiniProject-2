import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/apiService";

const TaskContext = createContext();

const TaskProvider = ({children} = {}) =>{
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await apiService.getAllTasks();

            // const updatedData = data.map(task => {
            //     if (task.tags) {
            //         return {
            //             ...task,
            //             tags: task.tags.split(",").map(tag => tag.trim())
            //         };
            //     }
            //     return task;
            // });

            setTasks(data);
        };fetch();
    }, []);


    useEffect(() => {
        console.log("Tasks updated to:", tasks);
    }, [tasks]);


    return(
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export default TaskProvider;