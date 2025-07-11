// import { useEffect, useState } from "react";

// import './TaskBoard.css'
// import { useTasks } from "../../context/TaskContext"

// import TaskCard from "../TaskCard/TaskCard"

// const TaskBoard = () =>{

//     const [toDo, setToDo] = useState([])
//     const [inProgress, setInProgress] = useState([])
//     const [done, setDone] = useState([])
//     const {tasks, setTasks}  = useTasks();
    
//     useEffect(()=>{
//         setToDo(tasks.filter((task) => task.taskStatus === "TODO"))
//         setInProgress(tasks.filter((task) => task.taskStatus === "IN_PROGRESS"))
//         setDone(tasks.filter((task) => task.taskStatus === "DONE"))
//     },[tasks]);

//     return(
//         <div className="taskBoardBody">
//             <div className="todo">
//                 <div className="head">To - Do</div>
//                 <div className="tasks">
//                     {toDo.length ? (
//                         toDo.map((task) => 
//                             <div key={task.id}>
//                                 <TaskCard task={task}/>
//                             </div>
//                         )
//                     ) : (
//                         <p>No tasks found</p>
//                     )}
//                 </div>
//             </div>
//             <div className="inProgress">
//                 <div className="head">In Progress</div>
//                 <div className="tasks">
//                     {inProgress.length ? (
//                         inProgress.map((task) => 
//                             <div key={task.id}>
//                                 <div key={task.id}>
//                                     <TaskCard task={task}/>
//                                 </div>
//                             </div>
//                         )
//                     ) : (
//                         <p>No tasks found</p>
//                     )}
//                 </div>
//             </div>
//             <div className="completed">
//                 <div className="head">Completed</div>
//                 <div className="tasks">
//                     {done.length ? (
//                         done.map((task) => 
//                             <div key={task.id}>
//                                 <TaskCard task={task}/>
//                             </div>
//                         )
//                     ) : (
//                         <p>No tasks found</p>
//                     )}
//                 </div>
//             </div>
//             <div>
               
//             </div>
//         </div>

//     )

// }

// export default TaskBoard;

import { useEffect, useState } from "react";
import "./TaskBoard.css";
import { useTasks } from "../../context/TaskContext";
import TaskCard from "../TaskCard/TaskCard";
import apiService from "../../services/apiService";

const TaskBoard = () => {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    setToDo(tasks.filter((task) => task.taskStatus === "TODO"));
    setInProgress(tasks.filter((task) => task.taskStatus === "IN_PROGRESS"));
    setDone(tasks.filter((task) => task.taskStatus === "DONE"));
  }, [tasks]);

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const onDrop = async (e, newStatus) => {
    const id = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(id)
        ? { ...task, taskStatus: newStatus }
        : task
    );

    // Update backend
    const changedTask = updatedTasks.find((t) => t.id === parseInt(id));
    await apiService.updateTaskStatus(parseInt(id), newStatus);

    setTasks(updatedTasks);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="taskBoardBody">
      <div
        className="todo"
        onDrop={(e) => onDrop(e, "TODO")}
        onDragOver={onDragOver}
      >
        <div className="head">To - Do</div>
        <div className="tasks">
          {toDo.length ? (
            toDo.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>

      <div
        className="inProgress"
        onDrop={(e) => onDrop(e, "IN_PROGRESS")}
        onDragOver={onDragOver}
      >
        <div className="head">In Progress</div>
        <div className="tasks">
          {inProgress.length ? (
            inProgress.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>

      <div
        className="completed"
        onDrop={(e) => onDrop(e, "DONE")}
        onDragOver={onDragOver}
      >
        <div className="head">Completed</div>
        <div className="tasks">
          {done.length ? (
            done.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
