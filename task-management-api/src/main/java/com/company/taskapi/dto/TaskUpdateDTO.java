package com.company.taskapi.dto;

import com.company.taskapi.entity.TaskPriority;
import com.company.taskapi.entity.TaskStatus;

import java.time.LocalDateTime;
import java.util.Set;

public class TaskUpdateDTO {

    private String title;
    private String description;
    private LocalDateTime dueDate;
    private Set<String> tags;
    private Integer estimatedHours;
    private Integer actualHours;
    private TaskStatus taskStatus;
    private TaskPriority taskPriority;

    // Getters and setters

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public Set<String> getTags() {
        return tags;
    }
    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }
    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public Integer getActualHours() {
        return actualHours;
    }
    public void setActualHours(Integer actualHours) {
        this.actualHours = actualHours;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }
    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public TaskPriority getTaskPriority() {
        return taskPriority;
    }
    public void setTaskPriority(TaskPriority taskPriority) {
        this.taskPriority = taskPriority;
    }
}
