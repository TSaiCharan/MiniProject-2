package com.company.taskapi.Controller;

import com.company.taskapi.dto.TaskRequestDTO;
import com.company.taskapi.entity.Task;
import com.company.taskapi.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TaskController {

    @Autowired
    TaskService taskService;

    @GetMapping("tasks")
    public List<Task> getAllTasks(){
        return taskService.findAll();
    }

    @GetMapping("tasks/{id}")
    public Optional<Task> getAllTasksById(@PathVariable long id){
        return taskService.findById(id);
    }

    @PostMapping("tasks")
    public String addNewTask( @RequestBody Task task){
        taskService.save(task);
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
    public String deleteTaskById( @PathVariable long id){
        taskService.deleteById(id);
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
