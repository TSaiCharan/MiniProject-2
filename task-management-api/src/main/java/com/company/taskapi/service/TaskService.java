package com.company.taskapi.service;

import com.company.taskapi.entity.Task;
import com.company.taskapi.entity.TaskStatus;
import com.company.taskapi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    public List<Task> findAll() {
        return (List<Task>) taskRepository.findAll();
    }

    public Optional<Task> findById(long id) {
        return taskRepository.findById(id);
    }

    public void save(Task task) {
        taskRepository.save(task);
    }

    public void deleteById(long id) {
        taskRepository.deleteById(id);
    }

    public void updateStatusById(long id, Task task) {
        TaskStatus status = task.getTaskStatus();
        taskRepository.updateStatusById(id, status);
    }

    public List<Task> searchTaskByTitleAndDescription(String searchString) {
        return taskRepository.searchTaskByTitleAndDescription(searchString);
    }
}
