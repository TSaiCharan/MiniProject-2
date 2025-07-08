import { useEffect, useState } from "react";

import './TaskBoard.css'
import { useTasks } from "../../context/TaskContext"

const TaskBoard = () =>{

    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [done, setDone] = useState([])
    const tasks  = useTasks();

    
    useEffect(()=>{
        // setToDo(tasks);
        setToDo(tasks.filter((task) => task.taskStatus === "TODO"))
        setInProgress(tasks.filter((task) => task.taskStatus === "IN_PROGRESS"))
        setDone(tasks.filter((task) => task.taskStatus === "DONE"))

    },[tasks]);

    return(
        <div className="taskBoardBody">
            <div className="todo">
                <div className="head">To - Do</div>
                this is to do
                {toDo.length ? (
                    toDo.map((task) => <div key={task.id}>{task.title}</div>)
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
            <div className="inProgress">
                <div className="head">In Progress</div>
                this is in progress
                {inProgress.length ? (
                    inProgress.map((task) => <div key={task.id}>{task.title}</div>)
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
            <div className="completed">
                <div className="head">Completed</div>
                this is completed
                {done.length ? (
                    toDo.map((task) => <div key={task.id}>{task.title}</div>)
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
            <div>
               
            </div>
        </div>

    )

}

export default TaskBoard;