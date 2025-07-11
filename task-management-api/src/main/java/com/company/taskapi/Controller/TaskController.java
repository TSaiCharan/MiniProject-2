package com.company.taskapi.Controller;

import com.company.taskapi.dto.TaskRequestDTO;
import com.company.taskapi.dto.TaskResponseDTO;
import com.company.taskapi.dto.TaskUpdateDTO;
import com.company.taskapi.entity.Task;
import com.company.taskapi.exception.TaskNotFoundException;
import com.company.taskapi.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("tasks")
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        List<Task> tasks = taskService.findAll();
        List<TaskResponseDTO> dtos = tasks.stream().map(this::convertToResponseDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("tasks/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable long id) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
        TaskResponseDTO dto = convertToResponseDTO(task);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("tasks")
    public ResponseEntity<String> addNewTask(@RequestBody TaskRequestDTO dto) {
        Task task = convertRequestDTOToEntity(dto);
        taskService.save(task);
        return new ResponseEntity<>("Added new task", HttpStatus.CREATED);
    }

    @PutMapping("tasks/{id}")
    public ResponseEntity<String> editCompleteTask(@PathVariable long id, @RequestBody TaskUpdateDTO dto) {
        System.out.println("here");
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
        updateEntityFromUpdateDTO(task, dto);
        taskService.save(task);
        return new ResponseEntity<>("Edited task with id: " + id, HttpStatus.OK);
    }

    @PatchMapping("tasks/{id}")
    public ResponseEntity<String> editPartialTask(@PathVariable long id, @RequestBody TaskUpdateDTO dto) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        updateEntityFromUpdateDTO(task, dto);
        taskService.save(task);
        return new ResponseEntity<>("Edited task with id: " + id, HttpStatus.OK);
    }

    @DeleteMapping("tasks/{id}")
    public ResponseEntity<String> deleteTaskById(@PathVariable long id) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        taskService.deleteById(id);
        return new ResponseEntity<>("Deleted task with id: " + id, HttpStatus.NO_CONTENT);
    }

    @GetMapping("tasks/search/{searchString}")
    public ResponseEntity<List<TaskResponseDTO>> searchTask(@PathVariable String searchString) {
        List<Task> tasks = taskService.searchTaskByTitleAndDescription(searchString);
        List<TaskResponseDTO> dtos = tasks.stream().map(this::convertToResponseDTO).collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PatchMapping("tasks/{id}/status")
    public ResponseEntity<String> updateTaskStatus(@PathVariable long id, @RequestBody TaskUpdateDTO dto) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        if (dto.getTaskStatus() != null) {
            task.setTaskStatus(dto.getTaskStatus());
            taskService.save(task);
        }

        return new ResponseEntity<>("Updated task with id: " + id + " status to " + dto.getTaskStatus(), HttpStatus.OK);
    }

    @GetMapping("tasks/overdue")
    public ResponseEntity<String> getOverdueTasks() {
        return new ResponseEntity<>("Overdue tasks", HttpStatus.OK);
    }

    @GetMapping("tasks/stats")
    public ResponseEntity<String> getStats() {
        return new ResponseEntity<>("Found these stats", HttpStatus.OK);
    }

    private TaskResponseDTO convertToResponseDTO(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate() != null ? task.getDueDate() : null);
        dto.setTags(task.getTags() != null ? task.getTags() : null);
        dto.setEstimatedHours(task.getEstimatedHours());
        dto.setActualHours(task.getActualHours());
        dto.setTaskStatus(task.getTaskStatus());
        dto.setTaskPriority(task.getTaskPriority());
        return dto;
    }

    private Task convertRequestDTOToEntity(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());

        if (dto.getDueDate() != null) {
            task.setDueDate(dto.getDueDate()); // Now dto.getDueDate() is LocalDateTime directly
        }

        if (dto.getTags() != null && !dto.getTags().isEmpty()) {
            task.setTags(dto.getTags()); // Already Set<String>, no need to cast
        }

        task.setEstimatedHours(dto.getEstimatedHours());
        task.setActualHours(dto.getActualHours());
        task.setTaskStatus(dto.getTaskStatus());
        task.setTaskPriority(dto.getTaskPriority());
        return task;
    }

    private void updateEntityFromUpdateDTO(Task task, TaskUpdateDTO dto) {
        if (dto.getTitle() != null) task.setTitle(dto.getTitle());
        if (dto.getDescription() != null) task.setDescription(dto.getDescription());
        if (dto.getDueDate() != null) task.setDueDate(dto.getDueDate());
        if (dto.getTags() != null && !dto.getTags().isEmpty()) task.setTags(dto.getTags());
        if (dto.getEstimatedHours() != null) task.setEstimatedHours(dto.getEstimatedHours());
        if (dto.getActualHours() != null) task.setActualHours(dto.getActualHours());
        if (dto.getTaskStatus() != null) task.setTaskStatus(dto.getTaskStatus());
        if (dto.getTaskPriority() != null) task.setTaskPriority(dto.getTaskPriority());
    }

}
