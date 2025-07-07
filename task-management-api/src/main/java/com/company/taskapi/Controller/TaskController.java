package com.company.taskapi.Controller;

import com.company.taskapi.dto.TaskRequestDTO;
import com.company.taskapi.entity.Task;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TaskController {

    @GetMapping("tasks")
    public String getAllTasks(){
        return "All tasks";
    }

    @GetMapping("tasks/{id}")
    public String getAllTasksById( @PathVariable int id){
        return "All tasks by " + id;
    }

    @PostMapping("tasks")
    public String addNewTask( @RequestBody Task task){
        return "Added new task";
    }

    @PutMapping("tasks/{id}")
    public String editCompleteTask( @PathVariable int id, @RequestBody Task task){
        return "Edited task with id: " + id;
    }

    @PatchMapping("tasks/{id}")
    public String editPartialTask(@PathVariable int id, @RequestBody Task task){
        return "Edited task with id: " + id;
    }

    @DeleteMapping("tasks/{id}")
    public String deleteTaskById( @PathVariable int id){
        return "Deleted task with id: " + id;
    }

    @GetMapping("tasks/search/{searchString}")
    public String searchTask( @PathVariable String searchString){
        return "5 different tasks found for string: " + searchString;
    }

    @GetMapping("tasks/stats")
    public String getStats(){
        return "Found these stats";
    }

    @PatchMapping("tasks/{id}/status")
    public String updateTaskStatus(@PathVariable int id, @RequestBody Task task){
        return "Updated task with id:"+ id + " status to ";
    }

    @GetMapping("tasks/overdue")
    public String getOverdueTasks(){
        return "Overdue tasks";
    }

}
