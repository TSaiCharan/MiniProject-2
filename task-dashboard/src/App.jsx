import { useState } from 'react'
import "./App.css"

// import TaskContext from "./context/TaskContext";
// import apiService from "./services/apiService";
import TaskProvider from "./context/TaskContext"
import TaskBoard from './Components/TaskBoard/TaskBoard'


function App() {
  console.log("Rendering App component");

  return (
    <TaskProvider>
    {/* <div> */}
      this is app
      <div className="body">
        <div className="header">Task Management Portal</div>
        <div className="taskBoard">
          <TaskBoard/>
        </div>
      </div>
    {/* </div> */}
    </TaskProvider>
  )
}

export default App
