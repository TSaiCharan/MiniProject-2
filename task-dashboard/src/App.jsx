import { useState } from 'react'
import "./App.css"

// import TaskContext from "./context/TaskContext";
// import apiService from "./services/apiService";
import TaskProvider from "./context/TaskContext"
import TaskBoard from './Components/TaskBoard/TaskBoard'
import TaskSearch from './Components/TaskSearch/TaskSearch'
import TaskForm from './Components/TaskForm/TaskForm'


function App() {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOverlayClick = (e) => {
    // Close modal if clicking outside content
    if (e.target.className === 'modal-overlay') {
      handleCloseForm();
    }
  };


  return (
    <TaskProvider>
      <div className="body">
        <div className="header">Task Management Portal</div>
        <div className="changes">
          <div className="search">
            <TaskSearch/>
          </div>

          <div className="addTask">
            <button className="searchbarbutton" onClick={handleAddClick}>
              Add new task
            </button>

            {showForm && (
              <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content">
                  <button className="close-button" onClick={handleCloseForm}>×</button>
                  <TaskForm submit = {handleCloseForm}/>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="taskBoard">
          <TaskBoard/>
        </div>
      </div>
    </TaskProvider>
  )
}

export default App
