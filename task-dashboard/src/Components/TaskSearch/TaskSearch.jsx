import { useState } from 'react'

import { useTasks } from "../../context/TaskContext"
import "../../services/apiService"

import "./TaskSearch.css"
import apiService from '../../services/apiService';


const TaskSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {tasks, setTasks}  = useTasks();
    
    const handleSearchClick = async (e) => {
        setSearchQuery(e.target.value)
        const str = e.target.value
        if(str .trim() == ""){
            setTasks(await apiService.getAllTasks())
        }
        else{
            setTasks(await apiService.getSearchResult(e.target.value));
        }

    };


    return(
        <div className="searchbar">
        <input
            className="searchbartext"
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchClick}
        />
        <button
            className="searchbarbutton"
            onClick={() => handleSearchClick({ target: { value: searchQuery } })}
        >
            Search
        </button>
        </div>
    )

};

export default TaskSearch;