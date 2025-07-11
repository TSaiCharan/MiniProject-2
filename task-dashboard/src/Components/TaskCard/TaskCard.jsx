import React, { useState } from 'react';
import './TaskCard.css';

import apiService from "../../services/apiService";
import { useTasks } from "../../context/TaskContext";

import TaskForm from '../TaskForm/TaskForm';

const TaskCard = ({ task, onDragStart }) => {
  const { tasks, setTasks } = useTasks();
  const [status, setStatus] = useState(task.taskStatus);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleStatusChange = async (e) => {
    setStatus(e.target.value);
    const id = task.id;

    await apiService.updateTaskStatus(task.id, e.target.value);

    const updated = tasks.map(task =>
      task.id === id ? { 
        ...task, taskStatus: e.target.value 
      } : task
    );
    setTasks(updated);
  };

  const handleEdit = () => {
    handleAddClick();

  };

  return (
    <div className="task-card" draggable onDragStart={(e) => onDragStart(e, task)}>
      <button className="edit-button" onClick={handleEdit}>Edit</button>
      {showForm && (
        <div className="modal-overlay" >
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseForm}>×</button>
            <TaskForm initialData={task} submit = {handleCloseForm}/>
          </div>
        </div>
      )}

      <h2 className="task-title">{task.title}</h2>
      <p className="task-description">{task.description}</p>

      <div className="task-tags">
        {task.tags.map((tag, index) => (
          <span key={index} className="task-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="task-footer">
        <div className="task-status">
          Status:&nbsp;
          <select value={status} onChange={handleStatusChange}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <span className="task-priority">Priority: {task.taskPriority}</span>
      </div>

      <div className="task-footer">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <span>Est. hrs: {task.estimatedHours}</span>
      </div>
    </div>
  );
};

export default TaskCard;
