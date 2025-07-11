import { useState } from "react";
import "./TaskForm.css";
import apiService from "../../services/apiService";
import { useTasks } from "../../context/TaskContext";

const TaskForm = ({ initialData = {}, submit }) => {
  const { setTasks } = useTasks();

  const isEditMode = !!initialData.id;

  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.substring(0, 10) : ""
  );
  const [tags, setTags] = useState(
    initialData.tags ? initialData.tags.join(", ") : ""
  );
  const [estimatedHours, setEstimatedHours] = useState(initialData.estimatedHours || 0);
  const [actualHours, setActualHours] = useState(initialData.actualHours || 0);
  const [taskStatus, setTaskStatus] = useState(initialData.taskStatus || "TODO");
  const [taskPriority, setTaskPriority] = useState(initialData.taskPriority || "LOW");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const dueDateTimeString = dueDate ? `${dueDate}T00:00:00` : null;

    const taskData = {
      title,
      description,
      dueDate: dueDateTimeString,
      tags: tagsArray,
      estimatedHours: Number(estimatedHours),
      actualHours: Number(actualHours),
      taskStatus,
      taskPriority,
    };

    let res;
    if (isEditMode) {
      res = await apiService.putTask(initialData.id, taskData);
    } else {
      res = await apiService.postNewTask(taskData);
    }

    if (res) {
      setTasks(await apiService.getAllTasks());
      submit();
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? "Edit Task" : "Add New Task"}</h2>

      <div className="form-row">
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="form-row">
        <label htmlFor="dueDate">Due Date:</label>
        <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="estimatedHours">Estimated Hours:</label>
        <input id="estimatedHours" type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="actualHours">Actual Hours:</label>
        <input id="actualHours" type="number" value={actualHours} onChange={(e) => setActualHours(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="taskStatus">Status:</label>
        <select id="taskStatus" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="taskPriority">Priority:</label>
        <select id="taskPriority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="URGENT">URGENT</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
